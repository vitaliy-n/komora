import { z } from 'zod'

export const inventorySchema = z.object({
  id: z.string().min(1, 'Потрібне поле: id'),
  productId: z.string().optional(),
  name: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  purchaseDate: z.string().optional(),
  storageMethod: z.string().optional(),
  expiryDate: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  price: z.number().min(0).optional().nullable(),
  createdAt: z.string().optional(),
})

export const inventoryBulkSchema = z.object({
  items: z.array(z.any()).min(1, 'Очікується масив items'),
})
