"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function TokenChecker() {
  const tokenexist = (await cookies()).get("token")?.value;
  if (!tokenexist) {
    return { error: "Failed to fetch" };
  }

  try {
    const decoding = jwt.verify(tokenexist, process.env.JWT_SECRET!) as {
      userId: string;
    };
    return { success: decoding.userId };
  } catch (err) {
    return { error: "Failed to fetch" };
  }
}
