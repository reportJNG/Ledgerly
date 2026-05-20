"use server";

import { expenses } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

type money = "income" | "expenses";
type dateM = "1d" | "3d" | "7d" | "1m";
type CalcResult = {
  all: number;
  profit: number;
  loss: number;
};
export async function Getreprot(type: money, dates: dateM, id: string) {
  if (!type || !dates || !id) return { error: "faild to fetch" };
  const data = await getexpensesdate(dates, id);

  if (!data || data === null) {
    return { error: "Failed to fetch" };
  }
  const result = calc(data);

  if (!result || result === undefined) {
    return { error: "Failed to fetch" };
  }
  if (result) {
    return { success: "Successfuly Updated !", data: result };
  }
}

//helping function to make it this clean version of work

function calc(dat: expenses[]): CalcResult | undefined {
  if (!dat || dat === undefined) {
    return undefined;
  }

  const callu: CalcResult = {
    all: 0,
    profit: 0,
    loss: 0,
  };
  for (let i = 0; i < dat.length; i++) {
    if (dat[i].type === "income") {
      callu.all += Number(dat[i].amount);
    }
    if (dat[i].type === "expenses") {
      callu.loss += Number(dat[i].amount);
    }
  }
  //here we calc the profit and logique is good all + is there all - is there
  callu.profit = callu.all - callu.loss;
  return callu;
}

async function getexpensesdate(
  date: dateM,
  id: string,
): Promise<expenses[] | null> {
  const dd = calcdate(date);
  const result = await prisma.expenses.findMany({
    where: {
      user_id: id,
      date: {
        gte: dd,
        lte: new Date(),
      },
    },
  });
  return result;
}

function calcdate(date: dateM): Date {
  const now = new Date();
  const start = new Date(now);
  if (date === "1d") {
    start.setDate(now.getDate() - 1);
  }

  if (date === "3d") {
    start.setDate(now.getDate() - 3);
  }
  if (date === "7d") {
    start.setDate(now.getDate() - 7);
  }
  if (date === "1m") {
    start.setMonth(now.getMonth() - 1);
  }
  return start;
}
