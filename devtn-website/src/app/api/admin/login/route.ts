import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminPassword, getAdminSessionToken } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = String(body?.password || "");

    if (password !== getAdminPassword()) {
      return NextResponse.json({ ok: false, error: "Mot de passe invalide" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: ADMIN_COOKIE,
      value: getAdminSessionToken(),
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}
