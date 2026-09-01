import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sanitizeText, sanitizeMobile } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const state = sanitizeText(body.state, 100);
    const district = sanitizeText(body.district, 100);
    const address = sanitizeText(body.address, 300);
    const houseType = sanitizeText(body.houseType, 50) || "Pucca";
    const userId = sanitizeText(body.userId, 100);
    const mobileNumber = sanitizeMobile(body.mobileNumber);
    const amenities = body.amenities || {};
    const assets = body.assets || {};

    if (!state || !district || !houseType) {
      return NextResponse.json(
        { error: "Missing required household fields: state, district, houseType" },
        { status: 400 }
      );
    }

    // Generate unique 12-digit Census ID e.g. IND-2027-MH-749102
    const stateCode = (state.substring(0, 2) || "IN").toUpperCase();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const censusId = `IND-2027-${stateCode}-${randomDigits}`;

    const household = await db.household.create({
      censusId,
      userId: userId || undefined,
      state,
      district,
      address: address || "Not Specified",
      houseType,
      amenities: {
        drinkingWater: sanitizeText(amenities.drinkingWater, 100),
        electricity: sanitizeText(amenities.electricity, 100),
        lightingSource: sanitizeText(amenities.lightingSource, 100),
        latrineType: sanitizeText(amenities.latrineType, 100),
        cookingFuel: sanitizeText(amenities.cookingFuel, 100),
        lpgPipedGas: Boolean(amenities.lpgPipedGas),
        drainage: sanitizeText(amenities.drainage, 100),
        bathingFacility: Boolean(amenities.bathingFacility),
      },
      assets: {
        radio: Boolean(assets.radio),
        television: Boolean(assets.television),
        internet: Boolean(assets.internet),
        laptopComputer: Boolean(assets.laptopComputer),
        twoWheeler: Boolean(assets.twoWheeler),
        fourWheeler: Boolean(assets.fourWheeler),
        smartPhone: Boolean(assets.smartPhone),
      },
      phase1Status: "COMPLETED",
    });

    return NextResponse.json({
      success: true,
      censusId: household.censusId,
      householdId: household.id,
      phase1Status: household.phase1Status,
      createdAt: household.createdAt,
      message: "Household Phase 1 registered successfully. Use this Census ID for Phase 2 population enumeration.",
    });
  } catch (error: any) {
    console.error("Error registering household:", error);
    return NextResponse.json(
      { error: "Failed to register household", details: error.message },
      { status: 500 }
    );
  }
}
