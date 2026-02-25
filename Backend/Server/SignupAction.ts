"use server";
import jwt from "jsonwebtoken";
import { SingupType } from "@/Frontend/Schemas/Signup";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function SignupAction(data: SingupType) {
  if (!data) {
    return { error: "Failed Data" };
  }
  const { email, name, password, confirmPassword } = data;
  if (!email || !name || !password || !confirmPassword) {
    return { error: "All fields are required" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email format" };
  }
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { error: "Name must contain only letters and numbers" };
  }
  if (name.length < 1 || name.length > 30) {
    return { error: "Name Have btween 1 and 30 letter" };
  }
  if (
    !/^[A-Za-z0-9]+$/.test(password) ||
    !/^[A-Za-z0-9]+$/.test(confirmPassword)
  ) {
    return { error: "Password must contain only letters and numbers" };
  }
  if (password !== confirmPassword) {
    return { error: "Password must be same" };
  }
  if (password.length < 8 || password.length > 16)
    return { error: "Password must be between 8 and 16 characters" };

  const exist = await prisma.users.findUnique({
    where: { email },
  });
  if (exist) {
    return { error: "Email used before" };
  }
  try {
    const data = await prisma.users.create({
      data: { email, name, password },
    });
    const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });
    return { success: "Accout create seccessfuly" };
  } catch {
    return { error: "Failed to fetch" };
  }
}
