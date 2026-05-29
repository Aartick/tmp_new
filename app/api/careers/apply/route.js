import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendFormEmail } from "@/lib/mail";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const role = formData.get("role") || "";
    const portfolio = formData.get("portfolio") || "";
    const message = formData.get("message") || "";
    const resumeFile = formData.get("resume");

    let resumeUrl = "";

    // Upload resume to Cloudinary if provided
    if (resumeFile && resumeFile.size > 0) {
      try {
        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "resumes",
              resource_type: "auto",
              public_id: `${name.replace(/\s+/g, "_")}_${Date.now()}`
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        resumeUrl = uploadResult.secure_url;
      } catch (uploadErr) {
        console.error("Resume upload to Cloudinary failed:", uploadErr);
        // Don't block the application if upload fails
      }
    }

    const doc = {
      name,
      email,
      phone,
      role,
      portfolio,
      message,
      resume_url: resumeUrl,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      source: "careers",
      status: "new",
    };

    const db = await getDb();
    await db.collection("careers").insertOne(doc);

    console.log(`Career application: ${doc.email} for ${doc.role}`);

    // Send email notification via Mailtrap SMTP
    try {
      const subject = `New Career Application: ${doc.role}`;
      const emailPayload = {
        name: doc.name || "N/A",
        email: doc.email || "N/A",
        phone: doc.phone || "N/A",
        role: doc.role || "N/A",
        portfolio: doc.portfolio || "N/A",
        message: doc.message || "N/A",
        resume: resumeUrl ? `<a href="${resumeUrl}">Download Resume</a>` : "Not provided",
        applicationId: doc.id,
        submittedAt: doc.created_at
      };
      
      await sendFormEmail(subject, emailPayload);
    } catch (mailError) {
      console.error("Failed to send career application email:", mailError);
    }

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (error) {
    console.error("Error applying for career:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
