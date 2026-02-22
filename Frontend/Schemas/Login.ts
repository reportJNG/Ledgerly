import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
  password: z
    .string()
    .min(8, "Password is required")
    .max(16, "Password max 16")
    .regex(/^[a-zA-Z0-9]+$/, "Password must only contain letters and numbers"),
});

export type LoginType = z.infer<typeof LoginSchema>;
