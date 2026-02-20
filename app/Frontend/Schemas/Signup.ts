import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
  name: z
    .string()
    .toLowerCase()
    .min(1, "Name is required")
    .max(30, "Max is 30")
    .regex(/^[a-zA-Z0-9]+$/, "Name must only contain letters and numbers"),

  password: z
    .string()
    .min(8, "Password is required")
    .max(16, "Password max 16")
    .regex(/^[a-zA-Z0-9]+$/, "Password must only contain letters and numbers"),
  confirmPassword: z
    .string()
    .min(8, "Password is required")
    .max(16, "Password max 16")
    .regex(/^[a-zA-Z0-9]+$/, "Password must only contain letters and numbers"),
});

export type SIGNupSchema = z.infer<typeof SignupSchema>;
