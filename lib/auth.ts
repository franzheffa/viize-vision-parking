import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export type SessionUser = { id: string; role: "USER" | "MANAGER" | "ADMIN"; email: string };

export function signSession(user: SessionUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function getSession(): SessionUser | null {
  const token = cookies().get("viize_session")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export function clearSessionCookie() {
  cookies().set("viize_session", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
}
