import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getDb } from "./mongodb";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod"
);
const JWT_ALGORITHM = "HS256";

export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
}

export async function createAccessToken(userId, email) {
  return new SignJWT({ sub: userId, email, type: "access" })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(JWT_SECRET);
}

export async function getCurrentAdmin(req) {
  // Await the cookies object in Next.js 15+
  const cookieStore = await cookies();
  let token = cookieStore.get("access_token")?.value;

  if (!token && req) {
    const authHeader = req.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
    });

    if (payload.type !== "access") {
      throw new Error("Invalid token");
    }

    const db = await getDb();
    const user = await db.collection("users").findOne(
      { id: payload.sub },
      { projection: { _id: 0, password_hash: 0 } }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      throw new Error("Token expired");
    }
    throw new Error("Invalid token");
  }
}
