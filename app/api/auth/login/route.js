import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { verifyPassword, createAccessToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.email?.toLowerCase().trim();
    
    if (!email || !body.password) {
      return NextResponse.json({ detail: "Missing credentials" }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ email });

    if (!user || !(await verifyPassword(body.password, user.password_hash))) {
      return NextResponse.json({ detail: "Invalid credentials" }, { status: 401 });
    }

    const token = await createAccessToken(user.id, email);
    
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 43200, // 12 hours
      path: "/",
    });

    return NextResponse.json({
      id: user.id,
      email: email,
      name: user.name || "Admin",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
