import z from "zod";

export const UpdaterProfilePasswordSchema = z.object({
  oldpassword: z
    .string()
    .min(8, "Password is required")
    .max(16, "Password max 16")
    .regex(/^[a-zA-Z0-9]+$/, "Password must only contain letters and numbers"),
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

export type UpdaterProfilePasswordType = z.infer<
  typeof UpdaterProfilePasswordSchema
>;
