import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Authenticate admin
    await getCurrentAdmin(req);

    // Validate Cloudinary environment configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({
        detail: "Cloudinary credentials are missing. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file."
      }, { status: 500 });
    }
    
    // Parse FormData
    const formData = await req.formData();
    const name = formData.get("name");
    const file = formData.get("file");

    if (!name || !file) {
      return NextResponse.json({ detail: "Brand name and logo file are required" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "brand-logos" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const db = await getDb();
    const newBrand = {
      id: crypto.randomUUID(),
      name: name,
      logo: uploadResult.secure_url,
      cloudinary_public_id: uploadResult.public_id,
      created_at: new Date().toISOString(),
    };

    await db.collection("brands").insertOne(newBrand);

    return NextResponse.json({ ok: true, brand: newBrand });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error creating brand logo:", error);
    return NextResponse.json({ detail: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // Authenticate admin
    await getCurrentAdmin(req);
    
    // Extract ID from search params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ detail: "Brand ID is required" }, { status: 400 });
    }

    const db = await getDb();
    const brand = await db.collection("brands").findOne({ id });

    if (!brand) {
      return NextResponse.json({ detail: "Brand not found" }, { status: 404 });
    }

    // Attempt to delete from Cloudinary if public_id exists
    if (brand.cloudinary_public_id) {
      try {
        await cloudinary.uploader.destroy(brand.cloudinary_public_id);
      } catch (cloudinaryErr) {
        console.error("Failed to delete image from Cloudinary:", cloudinaryErr);
      }
    }

    // Delete from MongoDB
    await db.collection("brands").deleteOne({ id });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error deleting brand:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
