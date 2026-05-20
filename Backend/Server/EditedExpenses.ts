"use server";

import { ExpenesesType } from "@/Frontend/Schemas/NewExpenses";
import { prisma } from "@/lib/prisma";
export async function Editedexpenses(
  item: ExpenesesType,
  id: string,
  itemid: string,
) {
  if (!item) return { error: "Failed to Fetch data" };
  try {
    const updates = await prisma.expenses.updateMany({
      where: {
        user_id: id,
        id: itemid,
      },
      data: item,
    });
    if (updates.count === 0) {
      return { error: "Failed to Fetch data" };
    } else {
      return { success: "Successfuly Updated" };
    }
  } catch {
    return { error: "Failed to Fetch data" };
  }
}
