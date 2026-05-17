"use server";

import { prisma } from "@/lib/prisma";
import type { expenses } from "@/lib/generated/prisma";

export async function GetAllExpenses(id: string,search:string): Promise<expenses[]> {
  if (!id) return [];
  
  return prisma.expenses.findMany({
    where: {
      user_id: id,
      name:{
        startsWith:search
      }
    },
  });
}
