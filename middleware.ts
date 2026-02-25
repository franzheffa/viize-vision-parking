import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /login -> /reserve (conducteur)
  if (pathname === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/reserve";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
