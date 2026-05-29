import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    const study = await db.collection("case_studies").findOne(
      { slug: slug, published: true },
      { projection: { _id: 0 } }
    );

    if (!study) {
      return NextResponse.json({ detail: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(study);
  } catch (error) {
    console.error("Error fetching public case study detail:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
