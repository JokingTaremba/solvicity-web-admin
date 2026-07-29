import { z } from "zod";

export const reportSchema = z.object({
  title: z
    .string()
    .min(1, "O título não pode ser vazio.")
    .max(255, "O título não pode ter mais de 255 caracteres."),
  description: z.string().optional(),
  categoryId: z.string().min(1, "A categoria é obrigatória."),
  street: z.string().min(1, "A rua não pode ser vazia."),
  number: z.string().optional(),
  city: z.string().min(1, "A cidade não pode ser vazia."),
  reference: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
