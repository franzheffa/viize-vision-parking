import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("viize_session")?.value;

  const isAuth = path.startsWith("/login") || path.startsWith("/api/auth");
  const isApi = path.startsWith("/api");

  if (!token && !isAuth && !isApi && (path.startsWith("/reserve") || path.startsWith("/reservations") || path.startsWith("/manager"))) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/reserve", "/reservations", "/manager/:path*"]
};
