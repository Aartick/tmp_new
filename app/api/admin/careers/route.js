import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req) {
  try {
    await getCurrentAdmin(req);
    const db = await getDb();
    
    const apps = await db.collection("careers")
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(500)
      .toArray();

    return NextResponse.json({ applications: apps });
  } catch (error) {
    if (error.message === "Not authenticated" || error.message === "Invalid token" || error.message === "Token expired") {
      return NextResponse.json({ detail: error.message }, { status: 401 });
    }
    console.error("Error fetching admin careers:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
