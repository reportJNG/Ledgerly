import { z } from "zod";

export const ExpensesSchema = z.object({
  name: z
    .string()
    .max(10)
    .min(1)
    .regex(/^[a-zA-Z0-9]+$/, "Name must only contain letters and numbers"),
  amount: z.number().max(1000000).min(0),
  type: z.enum(["income", "expense"]),
  category: z
    .string()
    .max(20)
    .min(2)
    .regex(/^[a-zA-Z]+$/, "Must only contain letters"),
  description: z
    .string()
    .max(100)
    .regex(/^[a-zA-Z]*$/, "Must only contain letters")
    .optional(),
});
export type ExpenesesType = z.infer<typeof ExpensesSchema>;
