import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\+\d{1,4}\d{10,11}$/, 'Formato de telefone inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
