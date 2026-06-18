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
      choices?: Array<{ message?: { content?: string } }>;
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

  const outputText = payload.output?.[0]?.content?.map((item) => item.text).filter(Boolean).join("\n");
  if (outputText) return outputText;

  return "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssistantRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return Response.json(
        { reply: "Пожалуйста, напишите сообщение." },
        { status: 400 },
      );
    }

    const upstreamUrl =
      process.env.MENTORIA_ASSISTANT_API_URL ||
      process.env.ASSISTANT_API_URL ||
      process.env.NEXT_PUBLIC_ASSISTANT_API_URL;

    if (!upstreamUrl) {
      return Response.json(
        { reply: "Ассистент временно недоступен. Попробуйте позже." },
        { status: 503 },
      );
    }

    const upstreamToken =
      process.env.MENTORIA_ASSISTANT_API_KEY ||
      process.env.ASSISTANT_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.OPENROUTER_API_KEY;

    const upstreamResponse = await fetch(upstreamUrl, {
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
        { reply: "Ассистент временно недоступен. Попробуйте позже." },
        { status: upstreamResponse.ok ? 502 : upstreamResponse.status },
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Assistant route error:", error);
    return Response.json(
      { reply: "Ассистент временно недоступен. Попробуйте позже." },
      { status: 500 },
    );
  }
}
