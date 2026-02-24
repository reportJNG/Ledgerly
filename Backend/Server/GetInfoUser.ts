"use server";

import { prisma } from "@/lib/prisma";
import { TokenChecker } from "./TokenChecker";
export async function GetInfoUser() {
  const id = (await TokenChecker()).success;
  try {
    const find = await prisma.users.findUnique({
      where: { id },
    });
    if (!find) {
      return { error: false };
    }
    return { success: find };
  } catch {
    return { error: false };
  }
}
