import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req) {
  try {
    await getCurrentAdmin(req);
    const db = await getDb();
    const openings = await db.collection("career_openings")
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ openings });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error fetching admin career openings:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await getCurrentAdmin(req);
    const body = await req.json();
    const db = await getDb();

    if (!body.title || !body.slug) {
      return NextResponse.json({ detail: "Title and slug are required" }, { status: 400 });
    }

    const existing = await db.collection("career_openings").findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ detail: "Slug already exists" }, { status: 400 });
    }

    const doc = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published: body.published !== false,
      location: body.location || "On-site · India",
      type: body.type || "Full-time",
    };

    await db.collection("career_openings").insertOne(doc);
    delete doc._id;

    return NextResponse.json(doc);
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error creating career opening:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
