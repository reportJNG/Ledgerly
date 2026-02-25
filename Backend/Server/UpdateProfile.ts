"use server";
import { UpdaterProfileType } from "@/Frontend/Schemas/UpdaterProfileInfo";
import { prisma } from "@/lib/prisma";

export async function UpdateProfileAction(
  id: string,
  data: UpdaterProfileType,
) {
  if (!id || !data) {
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

  const finduser = await prisma.users.findUnique({ where: { id } });

  if (!finduser) {
    return { error: "Failed to fetch" };
  }
  if (finduser.email === email && finduser.name === name) {
    return { success: "Saved Changes" };
  }
  try {
    const updating = await prisma.users.update({
      where: { id: finduser.id },
      data: { email: email.toLocaleLowerCase(), name },
    });
    return { success: "Profile Updated Successfully" };
  } catch {
    return { error: "Something went rong..." };
  }
}
