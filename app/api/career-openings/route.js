import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const openings = await db.collection("career_openings")
      .find({ published: true }, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ openings });
  } catch (error) {
    console.error("Error fetching career openings:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
