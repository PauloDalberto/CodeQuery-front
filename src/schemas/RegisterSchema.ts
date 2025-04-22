import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "É necessário preencher esse campo!"),
  email: z.string().min(1, "Digite seu email").email("Por favor, digite um email válido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não são iguais!",
  path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerSchema>;