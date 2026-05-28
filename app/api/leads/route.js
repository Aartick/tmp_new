import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const doc = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      status: "new",
      source: body.source || "audit",
    };

    const db = await getDb();
    await db.collection("leads").insertOne(doc);

    // Remove _id for the response if needed, but we can just return id
    console.log(`New lead [${doc.source}]: ${doc.email} – ${doc.name}`);

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
