"use server";
import { prisma } from "@/lib/prisma";

export async function UpdateProfileAction(
  id: string,
  email: string,
  name: string,
) {
  if (!id) {
    return { error: "Failed to fetch" };
  }

  const finduser = await prisma.users.findUnique({ where: { id } });

  if (!finduser) {
    return { error: "Failed to fetch" };
  }
}
