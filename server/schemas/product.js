import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().min(1, 'Потрібне поле: id'),
  name: z.string().min(1, 'Потрібне поле: name'),
  category: z.string().min(1, 'Потрібне поле: category'),
  icon: z.string().optional().default('📦'),
  storage: z.array(z.any()).optional(),
  compatibility: z.array(z.any()).optional(),
  spoilageSigns: z.array(z.string()).optional(),
  seasonMonths: z.array(z.number()).optional(),
  tips: z.array(z.string()).optional(),
  isBuiltIn: z.boolean().optional(),
})

export const productBulkSchema = z.object({
  products: z.array(z.any()).min(1, 'Очікується масив products'),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  search: z.string().optional(),
  category: z.string().optional(),
})
