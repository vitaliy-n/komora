import { z } from 'zod'

export const recipeSchema = z.object({
  id: z.string().min(1, 'Потрібне поле: id'),
  name: z.string().min(1, 'Потрібне поле: name'),
  categoryId: z.string().optional().nullable(),
  description: z.string().optional(),
  ingredients: z.array(z.any()).optional(),
  steps: z.array(z.string()).optional(),
  baseJars: z.number().optional(),
  baseJarSize: z.number().optional(),
  prepTime: z.number().optional().nullable(),
  cookTime: z.number().optional().nullable(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  tips: z.array(z.string()).optional(),
  isBuiltIn: z.boolean().optional(),
  productIds: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
})

export const recipeBulkSchema = z.object({
  recipes: z.array(z.any()).min(1, 'Очікується масив recipes'),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  search: z.string().optional(),
  categoryId: z.string().optional(),
})
