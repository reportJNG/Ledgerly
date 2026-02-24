import z from "zod";

export const UpdaterProfileSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
  name: z
    .string()
    .toLowerCase()
    .min(1, "Name is required")
    .max(30, "Max is 30")
    .regex(/^[a-zA-Z0-9]+$/, "Name must only contain letters and numbers"),
});

export type UpdaterProfileType = z.infer<typeof UpdaterProfileSchema>;
