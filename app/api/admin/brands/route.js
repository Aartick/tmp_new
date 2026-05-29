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

    // Parse JSON body — the image is already uploaded to Cloudinary
    // via the /api/admin/upload endpoint; we receive { name, logo } here.
    const body = await req.json();
    const { name, logo } = body;

    if (!name || !logo) {
      return NextResponse.json({ detail: "Brand name and logo URL are required" }, { status: 400 });
    }

    // Extract public_id from logo URL if it is a Cloudinary URL to support clean deletion
    let cloudinary_public_id = null;
    if (logo && logo.includes("res.cloudinary.com")) {
      const parts = logo.split("/");
      const tmpUploadsIndex = parts.indexOf("tmp-uploads");
      if (tmpUploadsIndex !== -1 && tmpUploadsIndex < parts.length - 1) {
        const fileWithExt = parts[parts.length - 1];
        const filename = fileWithExt.split(".")[0];
        cloudinary_public_id = `tmp-uploads/${filename}`;
      }
    }

    const db = await getDb();
    const newBrand = {
      id: crypto.randomUUID(),
      name: name,
      logo: logo,
      cloudinary_public_id: cloudinary_public_id,
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
