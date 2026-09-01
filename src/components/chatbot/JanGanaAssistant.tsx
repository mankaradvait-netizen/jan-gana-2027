"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { Badge } from "../ui/Badge";

interface ChatEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const JanGanaAssistant: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Namaste! 🙏 I am **Jan-Gana AI**, the official virtual assistant for Census 2027.\n\nHow can I help you today regarding self-enumeration, required documents, state dates, or data privacy rules?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const quickPills = [
    "What documents are needed?",
    "Is Aadhaar mandatory?",
    "Phase 1 vs Phase 2 difference",
    "How is my data protected under law?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    const userEntry: ChatEntry = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userEntry]);
    setInputVal("");
    setLoading(true);

    try {
      const apiMessages = [...messages, userEntry].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          language: language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiText = data.message?.content || "Thank you for reaching out to Jan-Gana 2027 support.";
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: aiText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error("Chat API failed");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content:
            "🔒 **Census 2027 Advisory**:\n\n• **Confidentiality**: All information recorded is strictly safeguarded under Section 15 of the Census Act, 1948 and DPDP Act 2023.\n• **No Documents**: No birth certificate or identity proof is verified.\n• **Helpline**: For any urgent issues, please dial toll-free **1800-11-2027**.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat reset. How may I assist you with Census 2027 today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Trigger Floating Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-saffron-600 via-saffron-500 to-emerald-600 hover:from-saffron-500 hover:to-emerald-500 text-sand-50 shadow-glow-saffron transition-all hover:scale-105 active:scale-95"
          aria-label="Open Census AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-obsidian-900 flex items-center justify-center border border-saffron-400/40">
            <Sparkles className="w-4 h-4 text-saffron-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold block leading-tight">
              Jan-Gana AI
            </span>
            <span className="text-[10px] text-sand-200 block opacity-90">
              Ask Any Census Query
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[560px] rounded-3xl bg-obsidian-950 border border-saffron-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Top Header */}
          <div className="p-4 bg-gradient-to-r from-obsidian-900 to-obsidian-850 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center border border-saffron-500/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-sand-50">
                    {t("chatTitle")}
                  </h4>
                  <Badge variant="emerald" size="sm" dot>
                    Online
                  </Badge>
                </div>
                <p className="text-[10px] text-sage-400">
                  ORGI Official Intelligence Bot
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-sage-400 hover:text-sand-100 hover:bg-slate-800 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-sage-400 hover:text-sand-100 hover:bg-slate-800 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-obsidian-900/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center shrink-0 border border-saffron-500/30 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs space-y-1 ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-saffron-600 to-saffron-500 text-sand-50 rounded-tr-none shadow-sm"
                      : "bg-obsidian-900 border border-slate-800 text-sand-100 rounded-tl-none leading-relaxed"
                  }`}
                >
                  <div className="whitespace-pre-line">{m.content}</div>
                  <span
                    className={`text-[9px] block text-right ${
                      m.role === "user" ? "text-saffron-200" : "text-sage-500"
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-sand-200 flex items-center justify-center shrink-0 border border-slate-700 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-sage-400">
                <div className="w-7 h-7 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center shrink-0 border border-saffron-500/30">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-obsidian-900 border border-slate-800 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-saffron-400" />
                  <span>Jan-Gana AI is formulating answer...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-obsidian-900 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] custom-scrollbar">
            {quickPills.map((pill, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(pill)}
                className="px-2.5 py-1 rounded-lg bg-obsidian-800 hover:bg-slate-700 text-sage-300 hover:text-sand-50 whitespace-nowrap border border-slate-700/70 transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-obsidian-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t("chatPlaceholder")}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 placeholder-sage-500 focus:outline-none focus:border-saffron-500"
            />
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 disabled:opacity-50 disabled:cursor-not-allowed text-sand-50 transition-all shadow-glow-saffron"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
