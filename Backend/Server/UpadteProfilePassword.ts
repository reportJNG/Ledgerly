"use server";
import { UpdaterProfilePasswordType } from "@/Frontend/Schemas/UpadaterProfilePassword";
import { prisma } from "@/lib/prisma";

export async function UpdateProfilePasswordAction(
  id: string,
  passworduser: string,
  data: UpdaterProfilePasswordType,
) {
  if (!data || !id) {
    return { error: "Failed to fetch" };
  }

  const { password, confirmPassword } = data;

  if (password.length < 8 || password.length > 16) {
    return { error: "Password must be between 8 and 16 characters" };
  }

  if (password !== confirmPassword) {
    return { error: "Password must be same" };
  }

  if (
    !/^[A-Za-z0-9]+$/.test(password) ||
    !/^[A-Za-z0-9]+$/.test(confirmPassword)
  ) {
    return { error: "Password must contain only letters and numbers" };
  }

  if (password === passworduser) {
    return { success: "Changes Saved" };
  }
  try {
    const result = await prisma.users.update({
      where: { id },
      data: { password: password },
    });
    return { success: "Password Updated Successfully" };
  } catch {
    return { error: "Something went rong..." };
  }
}
