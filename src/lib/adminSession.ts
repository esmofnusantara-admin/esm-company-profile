import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "esm_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type AdminRole = "SUPER_ADMIN" | "CONTENT_ADMIN" | "FINANCE_ADMIN";

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
}

function getSessionSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("NEXTAUTH_SECRET minimal 32 karakter wajib dikonfigurasi.");
  }
  return secret;
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createAdminSessionToken(
  session: Omit<AdminSession, "exp">
): string {
  const payload: AdminSession = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

export function verifyAdminSessionToken(token?: string | null): AdminSession | null {
  if (!token) return null;

  const [encodedPayload, signature, extra] = token.split(".");
  if (!encodedPayload || !signature || extra) return null;

  try {
    const expected = Buffer.from(signPayload(encodedPayload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AdminSession;

    if (
      !session.id ||
      !session.email ||
      !session.name ||
      !session.role ||
      !session.exp ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getVerifiedAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession(
  allowedRoles?: AdminRole[]
): Promise<AdminSession> {
  const session = await getVerifiedAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}
