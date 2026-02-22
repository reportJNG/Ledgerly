"use server";

import { SingupType } from "@/Frontend/Schemas/Signup";
import { prisma } from "@/lib/prisma";

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
  if (!exist) {
    return { error: "Email used before" };
  }
  try {
    const putdata = await prisma.users.create({
      data: { email, name, password },
    });
    return { success: "Accout create seccessfuly" };
  } catch (err) {
    return { error: "Failed to fetch" };
  }
}
