import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "devtn_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const expected = process.env.ADMIN_SESSION_TOKEN || "devtn-session-token-change-me";

    if (token !== expected) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
