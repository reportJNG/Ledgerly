"use server";
type money = {
  name: "income" | "expenses";
};
type dateM = {
  d: "1d" | "3d" | "7d" | "1m";
};
export async function Getreprot(type: money, dates: dateM) {
  if (!type || !dates) return { error: "faild to fetch" };
}
