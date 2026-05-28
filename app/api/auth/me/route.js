import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getCurrentAdmin(req);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ detail: error.message }, { status: 401 });
  }
}
