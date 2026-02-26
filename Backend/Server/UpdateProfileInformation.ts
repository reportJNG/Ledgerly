"use server";
import { UpdaterProfileInfoType } from "@/Frontend/Schemas/UpdaterProfileInfo";
import { prisma } from "@/lib/prisma";
import { users } from "@/lib/generated/prisma";

export async function UpdateProfileInfoAction(
  user: users,
  data: UpdaterProfileInfoType,
) {
  if (!user || !data) {
    return { error: "Failed to fetch" };
  }
  const { email, name } = data;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email format" };
  }
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { error: "Name must contain only letters and numbers" };
  }
  if (name.length < 1 || name.length > 30) {
    return { error: "Name Have btween 1 and 30 letter" };
  }

  try {
    const emailChanged = user.email !== email;
    const nameChanged = user.name !== name;
    if (!emailChanged && !nameChanged) {
      return { success: "Changes Saved" };
    }
    await prisma.users.update({
      where: { id: user.id },
      data: {
        ...(emailChanged && { email: email.toLocaleLowerCase() }),
        ...(nameChanged && { name }),
      },
    });
    return { success: "Informations Updated Successfully" };
  } catch {
    return { error: "Something went rong..." };
  }
}
