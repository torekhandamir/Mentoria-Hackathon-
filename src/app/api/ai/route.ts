import { buildAssistantReply } from "@/lib/assistant";
import { UserProfile } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      messages?: { role: "user" | "assistant"; content: string }[];
      profile?: Partial<UserProfile> | null;
    };

    const message = body.message?.trim();
    if (!message) {
      return Response.json(
        { reply: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435." },
        { status: 400 },
      );
    }

    const reply = buildAssistantReply({
      message,
      messages: body.messages,
      profile: body.profile,
    });

    return Response.json({ reply });
  } catch (error) {
    console.error("Assistant route error:", error);
    return Response.json(
      {
        reply:
          "\u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435.",
      },
      { status: 500 },
    );
  }
}
