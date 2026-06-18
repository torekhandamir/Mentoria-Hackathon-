"use client";

import { useEffect, useMemo, useState } from "react";
import { AssistantChatMessage } from "@/lib/assistant";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const HISTORY_KEY = "mentoria-assistant-history";

const promptSuggestions = [
  "\u041f\u043e\u0434\u0431\u0435\u0440\u0438 \u043c\u043d\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u043f\u043e \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u043a\u0435",
  "\u0421\u043e\u0441\u0442\u0430\u0432\u044c \u043c\u043d\u0435 7-\u0434\u043d\u0435\u0432\u043d\u044b\u0439 \u043f\u043b\u0430\u043d \u043f\u043e SAT Math",
  "\u041a\u0430\u043a\u0438\u0435 research programs \u043f\u043e\u0434\u043e\u0439\u0434\u0443\u0442 \u0434\u043b\u044f grade 10?",
  "\u0427\u0442\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 \u0440\u0435\u0441\u0443\u0440\u0441\u0430\u0445 \u0434\u043b\u044f economics major?",
  "\u041a\u0430\u043a\u043e\u0439 \u043a\u0443\u0440\u0441 \u043d\u0430\u0447\u0430\u0442\u044c \u043f\u0435\u0440\u0432\u044b\u043c \u0434\u043b\u044f admissions track?",
];

type AssistantResponsePayload = {
  reply?: string;
  message?: string;
  content?: string;
  answer?: string;
};

function getInitialMessages() {
  if (typeof window === "undefined") {
    return [] as AssistantChatMessage[];
  }

  try {
    const raw = window.sessionStorage.getItem(HISTORY_KEY);
    if (!raw) {
      return [] as AssistantChatMessage[];
    }

    const parsed = JSON.parse(raw) as AssistantChatMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as AssistantChatMessage[];
  }
}

function getAssistantReply(payload: AssistantResponsePayload | null) {
  if (!payload) return "";
  return payload.reply || payload.message || payload.content || payload.answer || "";
}

export function MentoriaAssistantPanel() {
  const { lang, t } = useTranslation();
  const [messages, setMessages] = useState<AssistantChatMessage[]>(getInitialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profile = useMemo(() => getLocal<UserProfile | null>("current-user", null), []);

  const copy = useMemo(
    () => ({
      user:
        lang === "ru"
          ? "\u0412\u044b"
          : lang === "kk"
            ? "\u0421\u0456\u0437"
            : "You",
      assistant: "Mentoria Assistant",
      thinking:
        lang === "ru"
          ? "\u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442 \u0434\u0443\u043c\u0430\u0435\u0442..."
          : lang === "kk"
            ? "\u041a\u04e9\u043c\u0435\u043a\u0448\u0456 \u043e\u0439\u043b\u0430\u043d\u044b\u043f \u0436\u0430\u0442\u044b\u0440..."
            : "Assistant is thinking...",
      unavailable:
        lang === "ru"
          ? "\u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435."
          : lang === "kk"
            ? "\u041a\u04e9\u043c\u0435\u043a\u0448\u0456 \u0443\u0430\u049b\u044b\u0442\u0448\u0430 \u049b\u043e\u043b\u0436\u0435\u0442\u0456\u043c\u0441\u0456\u0437. \u041a\u0435\u0439\u0456\u043d\u0456\u0440\u0435\u043a \u049b\u0430\u0439\u0442\u0430\u043b\u0430\u043f \u043a\u04e9\u0440\u0456\u04a3\u0456\u0437."
            : "Assistant is temporarily unavailable. Please try again later.",
    }),
    [lang],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const submitMessage = async (preset?: string) => {
    const nextMessage = (preset ?? input).trim();
    if (!nextMessage || isLoading) return;

    const nextUserMessage: AssistantChatMessage = {
      role: "user",
      content: nextMessage,
    };
    const nextMessages = [...messages, nextUserMessage];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: nextMessage,
          messages: nextMessages,
          profile,
        }),
      });

      let data: AssistantResponsePayload | null = null;
      try {
        data = (await response.json()) as AssistantResponsePayload;
      } catch {
        data = null;
      }

      const reply = getAssistantReply(data);
      if (!response.ok || !reply) {
        throw new Error("Invalid assistant response");
      }

      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (submitError) {
      console.error("Assistant UI error:", submitError);
      setError(copy.unavailable);
      setMessages([...nextMessages, { role: "assistant", content: copy.unavailable }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle>{t("assistantTitle")}</CardTitle>
      <p className="mt-2 text-sm text-slate-400">{t("assistantSubtitle")}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {promptSuggestions.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => {
              setInput(prompt);
              void submitMessage(prompt);
            }}
            className="rounded-full border border-[#324E60] px-3 py-1 text-xs text-[#94CFDB]"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div
        className="mt-5 max-h-80 space-y-3 overflow-y-auto rounded-xl border border-[#324E60] bg-[#07111F]/60 p-4"
        aria-live="polite"
      >
        {messages.length === 0 && <p className="text-sm text-slate-300">{t("assistantEmpty")}</p>}

        {messages.map((chatMessage, index) => (
          <div
            key={`${chatMessage.role}-${index}-${chatMessage.content.slice(0, 24)}`}
            className={`flex ${chatMessage.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl border px-4 py-3 text-sm ${
                chatMessage.role === "user"
                  ? "border-[#5E96CA] bg-[#5E96CA]/15 text-white"
                  : "border-[#324E60] bg-[#0F1621] text-slate-200"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Badge className={chatMessage.role === "user" ? "text-[#07111F]" : ""}>
                  {chatMessage.role === "user" ? copy.user : copy.assistant}
                </Badge>
              </div>
              <p className="whitespace-pre-line">{chatMessage.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-2xl border border-[#324E60] bg-[#0F1621] px-4 py-3 text-sm text-slate-300">
              {copy.thinking}
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

      <form
        className="mt-5 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void submitMessage();
        }}
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("assistantPlaceholder")}
        />
        <Button type="submit" disabled={isLoading}>
          {t("ask")}
        </Button>
      </form>
    </Card>
  );
}
