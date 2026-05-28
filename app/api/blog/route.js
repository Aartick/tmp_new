import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const posts = await db.collection("blog")
      .find({ published: true }, { projection: { _id: 0, content: 0 } })
      .sort({ created_at: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching public blogs:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
