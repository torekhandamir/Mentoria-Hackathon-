type AssistantRequestBody = {
  message?: string;
  messages?: { role: "user" | "assistant"; content: string }[];
  profile?: Record<string, unknown> | null;
};

type AssistantApiPayload =
  | {
      reply?: string;
      message?: string;
      content?: string;
      answer?: string;
      output_text?: string;
      choices?: Array<{
        message?: {
          content?:
            | string
            | Array<{
                type?: string;
                text?: string;
              }>;
        };
      }>;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    }
  | string
  | null;

function extractReply(payload: AssistantApiPayload) {
  if (!payload) return "";
  if (typeof payload === "string") return payload;
  if (typeof payload.reply === "string" && payload.reply) return payload.reply;
  if (typeof payload.message === "string" && payload.message) return payload.message;
  if (typeof payload.content === "string" && payload.content) return payload.content;
  if (typeof payload.answer === "string" && payload.answer) return payload.answer;
  if (typeof payload.output_text === "string" && payload.output_text) return payload.output_text;

  const choiceText = payload.choices?.[0]?.message?.content;
  if (typeof choiceText === "string" && choiceText) return choiceText;
  if (Array.isArray(choiceText)) {
    const text = choiceText
      .map((item) => item.text)
      .filter(Boolean)
      .join("\n");
    if (text) return text;
  }

  const outputText = payload.output?.[0]?.content?.map((item) => item.text).filter(Boolean).join("\n");
  if (outputText) return outputText;

  return "";
}

function unavailable() {
  return "Ассистент временно недоступен. Попробуйте позже.";
}

function toOpenAIInput(body: AssistantRequestBody) {
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

async function callUpstream(request: Request, body: AssistantRequestBody, upstreamUrl: string) {
  const upstreamToken =
    process.env.MENTORIA_ASSISTANT_API_KEY ||
    process.env.ASSISTANT_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    process.env.OPENAI_API_KEY;

  const resolvedUrl = new URL(upstreamUrl, request.url).toString();
  const upstreamResponse = await fetch(resolvedUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(upstreamToken ? { Authorization: `Bearer ${upstreamToken}` } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  let data: AssistantApiPayload = null;
  try {
    data = (await upstreamResponse.json()) as AssistantApiPayload;
  } catch {
    data = null;
  }

  const reply = extractReply(data);
  if (!upstreamResponse.ok || !reply) {
    console.error("Assistant upstream error:", {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
    });

    return Response.json(
      { reply: unavailable() },
      { status: upstreamResponse.ok ? 502 : upstreamResponse.status },
    );
  }

  return Response.json({ reply });
}

async function callOpenAI(body: AssistantRequestBody, apiKey: string) {
  const model =
    process.env.MENTORIA_ASSISTANT_MODEL ||
    process.env.ASSISTANT_MODEL ||
    process.env.OPENAI_MODEL ||
    "gpt-4.1-mini";

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: toOpenAIInput(body),
    }),
    cache: "no-store",
  });

  let data: AssistantApiPayload = null;
  try {
    data = (await response.json()) as AssistantApiPayload;
  } catch {
    data = null;
  }

  const reply = extractReply(data);
  if (!response.ok || !reply) {
    console.error("Assistant OpenAI error:", {
      status: response.status,
      statusText: response.statusText,
    });

    return Response.json(
      { reply: unavailable() },
      { status: response.ok ? 502 : response.status },
    );
  }

  return Response.json({ reply });
}

async function callOpenRouter(request: Request, body: AssistantRequestBody, apiKey: string) {
  const model =
    process.env.MENTORIA_ASSISTANT_MODEL ||
    process.env.ASSISTANT_MODEL ||
    process.env.OPENROUTER_MODEL;

  const origin = new URL(request.url).origin;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": origin,
      "X-OpenRouter-Title": "Mentoria Hub",
    },
    body: JSON.stringify({
      ...(model ? { model } : {}),
      messages: toOpenAIInput(body),
    }),
    cache: "no-store",
  });

  let data: AssistantApiPayload = null;
  try {
    data = (await response.json()) as AssistantApiPayload;
  } catch {
    data = null;
  }

  const reply = extractReply(data);
  if (!response.ok || !reply) {
    console.error("Assistant OpenRouter error:", {
      status: response.status,
      statusText: response.statusText,
    });

    return Response.json(
      { reply: unavailable() },
      { status: response.ok ? 502 : response.status },
    );
  }

  return Response.json({ reply });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssistantRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return Response.json({ reply: "Пожалуйста, напишите сообщение." }, { status: 400 });
    }

    const upstreamUrl =
      process.env.MENTORIA_ASSISTANT_API_URL ||
      process.env.ASSISTANT_API_URL ||
      process.env.NEXT_PUBLIC_ASSISTANT_API_URL;

    if (upstreamUrl) {
      return await callUpstream(request, body, upstreamUrl);
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey) {
      return await callOpenAI(body, openAiKey);
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
      return await callOpenRouter(request, body, openRouterKey);
    }

    return Response.json({ reply: unavailable() }, { status: 503 });
  } catch (error) {
    console.error("Assistant route error:", error);
    return Response.json({ reply: unavailable() }, { status: 500 });
  }
}
