"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AIChat() {
  const visitorId = useMemo(() => {
    if (typeof window === "undefined") {
      return "server";
    }
    const existing = window.localStorage.getItem("integratefastVisitorId");
    if (existing) {
      return existing;
    }
    const created = crypto.randomUUID();
    window.localStorage.setItem("integratefastVisitorId", created);
    return created;
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I am your AI implementation consultant. Ask me about the free audit, performance pricing, or where AI can increase profit first.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, messages: nextMessages }),
    });

    const body = (await response.json().catch(() => null)) as { response?: string } | null;
    setMessages([
      ...nextMessages,
      {
        role: "assistant",
        content:
          body?.response ??
          "I had trouble reaching the consultant service. The free AI audit is still the best next step.",
      },
    ]);
    setLoading(false);
  }

  return (
    <div className="rounded-[32px] bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-black text-white">
          AI
        </div>
        <div>
          <p className="font-bold">AI Consultant</p>
          <p className="text-sm text-emerald-600">Online now</p>
        </div>
      </div>
      <div className="mt-4 max-h-[360px] space-y-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            className={`rounded-2xl p-3 text-sm leading-6 ${
              message.role === "assistant"
                ? "bg-slate-100 text-slate-800"
                : "ml-10 bg-indigo-600 text-white"
            }`}
            key={`${message.role}-${index}`}
          >
            {message.content}
          </div>
        ))}
        {loading && <div className="rounded-2xl bg-slate-100 p-3 text-sm">Thinking...</div>}
      </div>
      <form className="mt-4 flex gap-2" onSubmit={submit}>
        <input
          className="field"
          placeholder="Ask about AI implementation..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="btn btn-secondary" disabled={loading} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
