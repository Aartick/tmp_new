import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const doc = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      source: "careers",
      status: "new",
    };

    const db = await getDb();
    await db.collection("careers").insertOne(doc);

    console.log(`Career application: ${doc.email} for ${doc.role}`);

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    console.error("Error applying for career:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
