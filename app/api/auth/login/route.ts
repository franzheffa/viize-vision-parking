import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { signSession } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials format" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

  const ok = await bcrypt.compare(parsed.data.password, user.password);
  if (!ok) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

  const token = signSession({ id: user.id, email: user.email, role: user.role });
  cookies().set("viize_session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });

  const redirect = user.role === "MANAGER" ? "/manager/dashboard" : "/reserve";
  return NextResponse.json({ ok: true, redirect });
}
