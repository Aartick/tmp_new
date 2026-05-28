import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const db = await getDb();
    const post = await db.collection("blog").findOne(
      { slug: slug, published: true },
      { projection: { _id: 0 } }
    );

    if (!post) {
      return NextResponse.json({ detail: "Not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching public blog:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
