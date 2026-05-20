"use server";

import { expenses } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
export async function Editedexpenses(item: expenses) {
  if (!item) return { error: "Failed to Fetch data" };
  try {
    const updates = await prisma.expenses.updateMany({
      where: {
        user_id: item.user_id,
        id: item.id,
      },
      data: item,
    });
    if (updates.count === 0) {
      return { success: "Successfuly Updated" };
    } else {
      return { error: "Failed to Fetch data" };
    }
  } catch {
    return { error: "Failed to Fetch data" };
  }
}
