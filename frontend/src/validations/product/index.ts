import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: 'Descrição deve ter pelo menos 3 caracteres',
    }),
  price: z
    .number({ invalid_type_error: 'Preço deve ser um número' })
    .min(0.01, 'Preço deve ser maior que zero')
    .max(999999.99, 'Preço muito alto')
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: 'Preço deve ter no máximo 2 casas decimais',
    }),
  stock: z
    .number({ invalid_type_error: 'Estoque deve ser um número' })
    .int('Estoque deve ser um número inteiro')
    .min(0, 'Estoque não pode ser negativo'),
  imageUrl: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'URL da imagem deve ser válida',
    }),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
