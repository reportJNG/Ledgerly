"use server";
import { UpdaterProfileType } from "@/Frontend/Schemas/UpdaterProfile";
import { prisma } from "@/lib/prisma";

export async function UpdateProfileAction(
  id: string,
  data: UpdaterProfileType,
) {
  if (!id || !data) {
    return { error: "Failed to fetch" };
  }

  const finduser = await prisma.users.findUnique({ where: { id } });

  if (!finduser) {
    return { error: "Failed to fetch" };
  }
}
