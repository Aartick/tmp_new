import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const studies = await db.collection("case_studies")
      .find({ published: true }, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ caseStudies: studies });
  } catch (error) {
    console.error("Error fetching public case studies:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
