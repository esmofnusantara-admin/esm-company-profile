"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  getVerifiedAdminSession,
} from "@/lib/adminSession";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email dan kata sandi wajib diisi." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return { success: false, error: "Email atau kata sandi tidak sesuai." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "Email atau kata sandi tidak sesuai." };
    }

    // Set signed, HTTP-only session cookie.
    const cookieStore = await cookies();
    const sessionToken = createAdminSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (err: unknown) {
    console.error("Login error:", err);
    return { success: false, error: "Gagal memproses login. Pastikan database aktif." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  return { success: true };
}

export async function getAdminSession() {
  return getVerifiedAdminSession();
}
