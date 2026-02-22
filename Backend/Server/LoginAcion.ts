"use server";
import { LoginType } from "@/Frontend/Schemas/Login";
import { prisma } from "@/lib/prisma";

export async function LoginAction(data: LoginType) {
  if (!data) {
    return { error: "Invalid data !" };
  }
  const { email, password } = data;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email format" };
  }

  if (!/^[A-Za-z0-9]+$/.test(password)) {
    return { error: "Password must contain only letters and numbers" };
  }

  if (password.length < 8 || password.length > 16) {
    return { error: "Password must be between 8 and 16 characters" };
  }

  try {
    const result = await prisma.users.findUnique({
      where: { email: email.toLocaleLowerCase() },
    });
    if (!result) {
      return { error: "Invalid email " };
    }
    if (result.password !== password) {
      return { error: "Invalid password" };
    }
    return { success: "Connected Successfully" };
  } catch (err) {
    return { error: "Failed to fetch" };
  }
}
