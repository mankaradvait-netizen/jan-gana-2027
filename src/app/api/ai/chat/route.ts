import { NextRequest, NextResponse } from "next/server";
import { askJanGanaAssistant, ChatMessage } from "@/lib/gemini";
import { sanitizeText, isPromptInjection } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, language } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Valid chat messages array is required" },
        { status: 400 }
      );
    }

    // Sanitize and cap last 10 messages to maintain speed & prevent payload abuse
    const recentMessages = messages.slice(-10).map((m: any) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: sanitizeText(m.content || "", 1000),
    }));

    const lastMessage = recentMessages[recentMessages.length - 1];

    if (lastMessage && isPromptInjection(lastMessage.content)) {
      return NextResponse.json({
        success: true,
        message: {
          role: "assistant",
          content:
            "🛡️ **Security Notice**: I am the official **Jan-Gana AI Assistant** for Census 2027. I am programmed to strictly assist citizens with official census schedules, self-enumeration guidelines, and privacy protections under the Census Act, 1948.",
        },
      });
    }

    const sanitizedLang = sanitizeText(language || "en", 10);
    const reply = await askJanGanaAssistant(recentMessages as ChatMessage[], sanitizedLang);

    return NextResponse.json({
      success: true,
      message: {
        role: "assistant",
        content: reply,
      },
    });
  } catch (error: any) {
    console.error("Error in AI chat assistant:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response", details: error.message },
      { status: 500 }
    );
  }
}
