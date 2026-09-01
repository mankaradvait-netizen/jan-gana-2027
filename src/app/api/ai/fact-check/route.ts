import { NextRequest, NextResponse } from "next/server";
import { verifyCensusClaim } from "@/lib/gemini";
import { db } from "@/lib/db";
import { sanitizeText, isPromptInjection } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawClaim = body.claim;
    const language = sanitizeText(body.language || "en", 10);

    if (!rawClaim || typeof rawClaim !== "string" || rawClaim.trim().length === 0) {
      return NextResponse.json(
        { error: "A valid census claim or question text is required" },
        { status: 400 }
      );
    }

    const sanitizedClaim = sanitizeText(rawClaim, 600);

    // Prompt injection & guardrail check
    if (isPromptInjection(sanitizedClaim)) {
      return NextResponse.json({
        success: true,
        claim: sanitizedClaim,
        verdict: "FALSE" as const,
        shortVerdict: "Security Guardrail Triggered",
        explanation:
          "System prompt extraction or instruction override attempts are blocked. Jan-Gana 2027 strictly operates under statutory Census Act 1948 rules.",
        legalReference: "Census Rules 1990 & DPDP Act 2023 Security Guidelines",
        confidenceScore: 1.0,
        tags: ["Security", "Guardrail"],
        timestamp: new Date().toISOString(),
      });
    }

    const verification = await verifyCensusClaim(sanitizedClaim, language);

    // Save verified claim log
    await db.claim.create({
      claimText: sanitizedClaim,
      aiVerdict: verification.verdict,
      explanation: verification.explanation,
      language: language,
    });

    return NextResponse.json({
      success: true,
      claim: sanitizedClaim,
      ...verification,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error verifying census claim:", error);
    return NextResponse.json(
      { error: "Failed to verify claim. Internal security fallback active.", details: error.message },
      { status: 500 }
    );
  }
}
