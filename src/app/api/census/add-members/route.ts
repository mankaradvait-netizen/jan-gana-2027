import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sanitizeText, validateAge } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const censusId = sanitizeText(body.censusId, 50);
    const householdId = sanitizeText(body.householdId, 50);
    const rawMembers = body.members;

    if (!rawMembers || !Array.isArray(rawMembers) || rawMembers.length === 0) {
      return NextResponse.json(
        { error: "At least one family member is required" },
        { status: 400 }
      );
    }

    let targetHouseholdId = householdId;
    if (!targetHouseholdId && censusId) {
      const hh = await db.household.findByCensusId(censusId);
      if (hh) {
        targetHouseholdId = hh.id;
      }
    }

    if (!targetHouseholdId) {
      targetHouseholdId = `hh-temp-${Date.now()}`;
    }

    const memberRecords = rawMembers.map((m: any) => {
      const genderVal = m.gender === "FEMALE" ? "FEMALE" : m.gender === "OTHER" ? "OTHER" : "MALE";
      return {
        householdId: targetHouseholdId,
        fullName: sanitizeText(m.fullName || "Family Member", 100),
        age: validateAge(m.age),
        gender: genderVal as "MALE" | "FEMALE" | "OTHER",
        relationToHead: sanitizeText(m.relationToHead || "Member", 50),
        maritalStatus: sanitizeText(m.maritalStatus || "Single", 50),
        motherTongue: sanitizeText(m.motherTongue || "Hindi", 50),
        otherLanguages: Array.isArray(m.otherLanguages)
          ? m.otherLanguages.map((l: any) => sanitizeText(l, 30))
          : [],
        literacyLevel: sanitizeText(m.literacyLevel || "Literate", 100),
        occupation: sanitizeText(m.occupation || "Employed", 100),
        migrationReason: sanitizeText(m.migrationReason || "None", 100),
        phase2Status: "COMPLETED" as const,
      };
    });

    const inserted = await db.member.createMany(memberRecords);

    return NextResponse.json({
      success: true,
      membersCount: inserted.length,
      members: inserted,
      message: "Family demographic members added successfully to digital census record.",
    });
  } catch (error: any) {
    console.error("Error adding members:", error);
    return NextResponse.json(
      { error: "Failed to add family members", details: error.message },
      { status: 500 }
    );
  }
}
