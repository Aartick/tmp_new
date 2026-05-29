import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const db = await getDb();
    const brands = await db.collection("brands")
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ brands });
  } catch (error) {
    console.error("Error fetching public brands:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
