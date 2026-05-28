import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req) {
  try {
    await getCurrentAdmin(req);
    const db = await getDb();
    const posts = await db.collection("blog")
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({ posts });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error fetching admin blogs:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await getCurrentAdmin(req);
    const body = await req.json();
    const db = await getDb();

    const existing = await db.collection("blog").findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ detail: "Slug already exists" }, { status: 400 });
    }

    const doc = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: body.author || "TMP Team",
      tags: body.tags || [],
      published: body.published !== false, // default true
      cover_image: body.cover_image || ""
    };

    await db.collection("blog").insertOne(doc);
    delete doc._id;

    return NextResponse.json(doc);
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error creating blog:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
