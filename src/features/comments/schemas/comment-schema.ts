import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(1, "O texto do comentário é obrigatório."),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
