"use server";
import { expenses } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function CreatingNewExpensesAction(id: string, item: expenses) {
  if (!id || !item) {
    return { error: "Failed to fetch" };
  }

  const { name, amount, category, description, type, date } = item;

  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { error: "Must contain only letters and numbers" };
  }
  if (name.length < 1 || name.length > 100) {
    return { error: "Name Must follow rules" };
  }

  if (Number(amount) <= 0 || Number(amount) > 1000000) {
    return { error: "Amount must follow rules" };
  }
  if (category && !/^[A-Za-z]+$/.test(category)) {
    return { error: "Must contain only letters" };
  }
  if (category.length < 2 || category.length > 20) {
    return { error: "Category must follow rules" };
  }
  if (type !== "income" && type !== "expense") {
    return { error: "Must contain only letters" };
  }
  if (description && !/^[A-Za-z\s]+$/.test(description)) {
    return { error: "Must contain only letters" };
  }
  if (description && description?.length > 100) {
    return { error: "Description must follow rules" };
  }
  if (date && isNaN(new Date(date).getTime())) {
    return { error: "Invalid date" };
  }

  try {
    const create = await prisma.expenses.create({
      data: {
        user_id: id,
        amount,
        category,
        description,
        date,
        name,
        type,
      },
    });
    if (create) {
      return { success: "Successfuly Created !" };
    }
  } catch {
    return { error: "Failed to fetch" };
  }
}
