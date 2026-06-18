type AssistantRequestBody = {
  message?: string;
  messages?: { role: "user" | "assistant"; content: string }[];
  profile?: Record<string, unknown> | null;
};

type OpenAIChoiceContent =
  | string
  | Array<{
      type?: string;
      text?: string;
    }>;

type AssistantApiPayload =
  | {
      reply?: string;
      message?: string;
      content?:
        | string
        | Array<{
            type?: string;
            text?: string;
          }>;
      answer?: string;
      output_text?: string;
      choices?: Array<{
        message?: {
          content?: OpenAIChoiceContent;
        };
      }>;
      output?: Array<{
        content?: Array<{
          text?: string;
        }>;
      }>;
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    }
  | string
  | null;

type ProviderConfig = {
  apiKey: string;
  model?: string;
  upstreamUrl?: string;
};

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }

  return "";
}

function joinText(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join("\n");
}

function extractReply(payload: AssistantApiPayload) {
  if (!payload) return "";
  if (typeof payload === "string") return payload;
  if (typeof payload.reply === "string" && payload.reply) return payload.reply;
  if (typeof payload.message === "string" && payload.message) return payload.message;
  if (typeof payload.answer === "string" && payload.answer) return payload.answer;
  if (typeof payload.output_text === "string" && payload.output_text) return payload.output_text;

  if (typeof payload.content === "string" && payload.content) return payload.content;
  if (Array.isArray(payload.content)) {
    const text = joinText(payload.content.map((item) => item.text));
    if (text) return text;
  }

  const choiceText = payload.choices?.[0]?.message?.content;
  if (typeof choiceText === "string" && choiceText) return choiceText;
  if (Array.isArray(choiceText)) {
    const text = joinText(choiceText.map((item) => item.text));
    if (text) return text;
  }

  const outputText = joinText(
    payload.output?.flatMap((item) => item.content?.map((contentItem) => contentItem.text) || []) || [],
  );
  if (outputText) return outputText;

  const candidateText = joinText(
    payload.candidates?.flatMap((candidate) => candidate.content?.parts?.map((part) => part.text) || []) || [],
  );
  if (candidateText) return candidateText;

  return "";
}

function unavailable() {
  return "Ассистент временно недоступен. Попробуйте позже.";
}

function toChatMessages(body: AssistantRequestBody) {
  const history =
    body.messages?.map((message) => ({
      role: message.role,
      content: message.content,
    })) || [];

  if (!history.length && body.message) {
    history.push({ role: "user", content: body.message });
  }

  return history;
}

function toGeminiContents(body: AssistantRequestBody) {
  return toChatMessages(body).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function toAnthropicMessages(body: AssistantRequestBody) {
  return toChatMessages(body).map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function jsonResponse(reply: string, status = 200) {
  return Response.json({ reply }, { status });
}

async function parseJson(response: Response) {
  try {
    return (await response.json()) as AssistantApiPayload;
  } catch {
    return null;
  }
}

function logProviderError(provider: string, response: Response, payload: AssistantApiPayload) {
  console.error(`Assistant ${provider} error:`, {
    status: response.status,
    statusText: response.statusText,
    payload,
  });
}

async function callUpstream(request: Request, body: AssistantRequestBody, config: ProviderConfig) {
  const resolvedUrl = new URL(config.upstreamUrl || "", request.url).toString();
  const upstreamResponse = await fetch(resolvedUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await parseJson(upstreamResponse);
  const reply = extractReply(data);
  if (!upstreamResponse.ok || !reply) {
    logProviderError("upstream", upstreamResponse, data);
    return jsonResponse(unavailable(), upstreamResponse.ok ? 502 : upstreamResponse.status);
  }

  return jsonResponse(reply);
}

async function callOpenAIResponses(body: AssistantRequestBody, apiKey: string, model: string, baseUrl?: string) {
  const response = await fetch(`${baseUrl || "https://api.openai.com/v1"}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: toChatMessages(body),
    }),
    cache: "no-store",
  });

  const data = await parseJson(response);
  const reply = extractReply(data);
  if (!response.ok || !reply) {
    logProviderError("responses", response, data);
    return jsonResponse(unavailable(), response.ok ? 502 : response.status);
  }

  return jsonResponse(reply);
}

async function callOpenAICompatibleChat(
  body: AssistantRequestBody,
  apiKey: string,
  model: string,
  baseUrl: string,
  extraHeaders?: Record<string, string>,
) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const response = await fetch(`${normalizedBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: toChatMessages(body),
    }),
    cache: "no-store",
  });

  const data = await parseJson(response);
  const reply = extractReply(data);
  if (!response.ok || !reply) {
    logProviderError("openai-compatible", response, data);
    return jsonResponse(unavailable(), response.ok ? 502 : response.status);
  }

  return jsonResponse(reply);
}

async function callGemini(body: AssistantRequestBody, apiKey: string, model: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: toGeminiContents(body),
      }),
      cache: "no-store",
    },
  );

  const data = await parseJson(response);
  const reply = extractReply(data);
  if (!response.ok || !reply) {
    logProviderError("gemini", response, data);
    return jsonResponse(unavailable(), response.ok ? 502 : response.status);
  }

  return jsonResponse(reply);
}

async function callAnthropic(body: AssistantRequestBody, apiKey: string, model: string) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 800,
      messages: toAnthropicMessages(body),
    }),
    cache: "no-store",
  });

  const data = await parseJson(response);
  const reply = extractReply(data);
  if (!response.ok || !reply) {
    logProviderError("anthropic", response, data);
    return jsonResponse(unavailable(), response.ok ? 502 : response.status);
  }

  return jsonResponse(reply);
}

function getUpstreamConfig(): ProviderConfig | null {
  const upstreamUrl = getEnv(
    "MENTORIA_ASSISTANT_API_URL",
    "ASSISTANT_API_URL",
    "AI_ASSISTANT_API_URL",
    "NEXT_PUBLIC_ASSISTANT_API_URL",
  );

  if (!upstreamUrl) return null;

  return {
    upstreamUrl,
    apiKey: getEnv(
      "MENTORIA_ASSISTANT_API_KEY",
      "ASSISTANT_API_KEY",
      "AI_ASSISTANT_API_KEY",
      "OPENAI_API_KEY",
      "OPENROUTER_API_KEY",
      "NEXT_PUBLIC_ASSISTANT_API_KEY",
    ),
  };
}

function getOpenAIConfig(): ProviderConfig | null {
  const apiKey = getEnv(
    "OPENAI_API_KEY",
    "AI_API_KEY",
    "MENTORIA_OPENAI_API_KEY",
    "NEXT_PUBLIC_OPENAI_API_KEY",
  );

  if (!apiKey) return null;

  return {
    apiKey,
    model: getEnv("MENTORIA_ASSISTANT_MODEL", "ASSISTANT_MODEL", "OPENAI_MODEL", "AI_MODEL") || "gpt-4.1-mini",
    upstreamUrl: getEnv("OPENAI_BASE_URL", "AI_BASE_URL"),
  };
}

function getOpenRouterConfig(): ProviderConfig | null {
  const apiKey = getEnv("OPENROUTER_API_KEY", "NEXT_PUBLIC_OPENROUTER_API_KEY");
  if (!apiKey) return null;

  return {
    apiKey,
    model:
      getEnv("MENTORIA_ASSISTANT_MODEL", "ASSISTANT_MODEL", "OPENROUTER_MODEL", "AI_MODEL") ||
      "openai/gpt-4.1-mini",
  };
}

function getGroqConfig(): ProviderConfig | null {
  const apiKey = getEnv("GROQ_API_KEY", "NEXT_PUBLIC_GROQ_API_KEY");
  if (!apiKey) return null;

  return {
    apiKey,
    model:
      getEnv("MENTORIA_ASSISTANT_MODEL", "ASSISTANT_MODEL", "GROQ_MODEL", "AI_MODEL") ||
      "openai/gpt-oss-20b",
  };
}

function getGeminiConfig(): ProviderConfig | null {
  const apiKey = getEnv(
    "GEMINI_API_KEY",
    "GOOGLE_GENERATIVE_AI_API_KEY",
    "GOOGLE_AI_API_KEY",
    "NEXT_PUBLIC_GEMINI_API_KEY",
    "NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY",
  );

  if (!apiKey) return null;

  return {
    apiKey,
    model:
      getEnv("MENTORIA_ASSISTANT_MODEL", "ASSISTANT_MODEL", "GEMINI_MODEL", "GOOGLE_GENERATIVE_AI_MODEL", "AI_MODEL") ||
      "gemini-3.5-flash",
  };
}

function getAnthropicConfig(): ProviderConfig | null {
  const apiKey = getEnv(
    "ANTHROPIC_API_KEY",
    "CLAUDE_API_KEY",
    "NEXT_PUBLIC_ANTHROPIC_API_KEY",
    "NEXT_PUBLIC_CLAUDE_API_KEY",
  );

  if (!apiKey) return null;

  return {
    apiKey,
    model:
      getEnv("MENTORIA_ASSISTANT_MODEL", "ASSISTANT_MODEL", "ANTHROPIC_MODEL", "CLAUDE_MODEL", "AI_MODEL") ||
      "claude-sonnet-4-0",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssistantRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return jsonResponse("Пожалуйста, напишите сообщение.", 400);
    }

    const upstreamConfig = getUpstreamConfig();
    if (upstreamConfig?.upstreamUrl) {
      return await callUpstream(request, body, upstreamConfig);
    }

    const openAiConfig = getOpenAIConfig();
    if (openAiConfig) {
      return await callOpenAIResponses(
        body,
        openAiConfig.apiKey,
        openAiConfig.model || "gpt-4.1-mini",
        openAiConfig.upstreamUrl,
      );
    }

    const openRouterConfig = getOpenRouterConfig();
    if (openRouterConfig) {
      return await callOpenAICompatibleChat(
        body,
        openRouterConfig.apiKey,
        openRouterConfig.model || "openai/gpt-4.1-mini",
        "https://openrouter.ai/api/v1",
        {
          "HTTP-Referer": new URL(request.url).origin,
          "X-OpenRouter-Title": "Mentoria Hub",
        },
      );
    }

    const groqConfig = getGroqConfig();
    if (groqConfig) {
      return await callOpenAICompatibleChat(
        body,
        groqConfig.apiKey,
        groqConfig.model || "openai/gpt-oss-20b",
        "https://api.groq.com/openai/v1",
      );
    }

    const geminiConfig = getGeminiConfig();
    if (geminiConfig) {
      return await callGemini(body, geminiConfig.apiKey, geminiConfig.model || "gemini-3.5-flash");
    }

    const anthropicConfig = getAnthropicConfig();
    if (anthropicConfig) {
      return await callAnthropic(body, anthropicConfig.apiKey, anthropicConfig.model || "claude-sonnet-4-0");
    }

    console.error("Assistant configuration error: no supported server env variables found.");
    return jsonResponse(unavailable(), 503);
  } catch (error) {
    console.error("Assistant route error:", error);
    return jsonResponse(unavailable(), 500);
  }
}
