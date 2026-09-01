import { NextRequest, NextResponse } from "next/server";
import { STATES_AND_UTS } from "@/lib/data/statesData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const status = searchParams.get("status") || "";
    const zone = searchParams.get("zone") || "";
    const type = searchParams.get("type") || "";

    let filtered = STATES_AND_UTS;

    if (query) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.code.toLowerCase().includes(query) ||
          s.zone.toLowerCase().includes(query)
      );
    }

    if (status && status !== "ALL") {
      filtered = filtered.filter((s) => s.status === status);
    }

    if (zone && zone !== "ALL") {
      filtered = filtered.filter((s) => s.zone === zone);
    }

    if (type && type !== "ALL") {
      filtered = filtered.filter((s) => s.type === type);
    }

    return NextResponse.json({
      success: true,
      totalCount: filtered.length,
      states: filtered,
      nationalPhase1Launch: "2027-04-01",
      nationalPhase2Launch: "2027-09-01",
    });
  } catch (error: any) {
    console.error("Error fetching state schedules:", error);
    return NextResponse.json(
      { error: "Failed to fetch state schedules", details: error.message },
      { status: 500 }
    );
  }
}
