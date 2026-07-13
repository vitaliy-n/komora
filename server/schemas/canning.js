import { z } from 'zod'

export const canningSchema = z.object({
  id: z.string().min(1, 'Потрібне поле: id'),
  name: z.string().optional(),
  categoryId: z.string().optional(),
  recipeId: z.string().optional().nullable(),
  date: z.string().optional(),
  expiryDate: z.string().optional().nullable(),
  jarSize: z.number().optional(),
  totalJars: z.number().optional(),
  consumedJars: z.number().optional(),
  storageLocation: z.string().optional(),
  photos: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5).optional().nullable(),
  review: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const canningBulkSchema = z.object({
  items: z.array(z.any()).min(1, 'Очікується масив items'),
})
