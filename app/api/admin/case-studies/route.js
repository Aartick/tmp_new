import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req) {
  try {
    await getCurrentAdmin(req);
    const db = await getDb();
    const studies = await db.collection("case_studies")
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ caseStudies: studies });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error fetching admin case studies:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await getCurrentAdmin(req);
    const body = await req.json();
    const db = await getDb();

    if (!body.brand || !body.slug) {
      return NextResponse.json({ detail: "Brand name and slug are required" }, { status: 400 });
    }

    const existing = await db.collection("case_studies").findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ detail: "Slug already exists" }, { status: 400 });
    }

    const doc = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      flagship: body.flagship === true,
      published: body.published !== false,
      cover_image: body.cover_image || ""
    };

    await db.collection("case_studies").insertOne(doc);
    delete doc._id;

    return NextResponse.json(doc);
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error creating case study:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
