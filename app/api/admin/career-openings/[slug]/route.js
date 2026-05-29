import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentAdmin } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    await getCurrentAdmin(req);
    const { slug } = await params;
    const body = await req.json();
    
    const doc = {
      ...body,
      updated_at: new Date().toISOString(),
    };
    
    const db = await getDb();
    const res = await db.collection("career_openings").updateOne(
      { slug: slug },
      { $set: doc }
    );

    if (res.matchedCount === 0) {
      return NextResponse.json({ detail: "Opening not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error updating career opening:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await getCurrentAdmin(req);
    const { slug } = await params;
    
    const db = await getDb();
    const res = await db.collection("career_openings").deleteOne({ slug: slug });

    if (res.deletedCount === 0) {
      return NextResponse.json({ detail: "Opening not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error deleting career opening:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
