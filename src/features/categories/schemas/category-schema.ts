import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "O nome da categoria é obrigatório.")
    .max(100, "O nome não pode ter mais de 100 caracteres."),
  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
