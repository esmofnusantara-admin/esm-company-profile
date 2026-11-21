import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "esm_admin_session";
const encoder = new TextEncoder();

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hasValidAdminSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const secret = process.env.NEXTAUTH_SECRET;
  if (!token || !secret || secret.length < 32) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature),
      encoder.encode(payload)
    );
    if (!valid) return false;

    const session = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(payload))
    ) as { exp?: number };
    return Boolean(session.exp && session.exp > Math.floor(Date.now() / 1000));
  } catch {
    return false;
  }
}

function isSensitiveApiRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (pathname === "/api/upload" || pathname === "/api/transactions") return true;
  if (pathname === "/api/donations" && method === "GET") return true;
  if (pathname.startsWith("/api/articles") && method !== "GET") return true;
  if (pathname === "/api/events" && method !== "GET") return true;
  if (pathname === "/api/bulletins" && method !== "GET") return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const needsAdmin =
    (pathname.startsWith("/admin") && !isLoginPage) || isSensitiveApiRequest(request);

  if (!needsAdmin) return NextResponse.next();
  if (await hasValidAdminSession(request)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { success: false, error: "Autentikasi admin diperlukan." },
      { status: 401 }
    );
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
