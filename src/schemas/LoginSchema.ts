import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Digite seu email").email("Por favor, digite um email válido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
});

export type LoginFormData = z.infer<typeof loginSchema>;