import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendFormEmail } from "@/lib/mail";

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

    // Send email notification via Mailtrap SMTP
    try {
      const subject = `New Lead Submission [${doc.source}]`;
      const { _id, id, created_at, status, source, ...formData } = doc;
      
      // We'll pass the core formData along with metadata
      const emailPayload = {
        name: doc.name || "N/A",
        email: doc.email || "N/A",
        ...formData,
        source: doc.source,
        leadId: doc.id,
        submittedAt: doc.created_at
      };
      
      await sendFormEmail(subject, emailPayload);
    } catch (mailError) {
      console.error("Failed to send lead email:", mailError);
    }

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
