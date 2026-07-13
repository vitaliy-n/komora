import { z } from 'zod'
const s = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  search: z.string().optional(),
  category: z.string().optional(),
})
console.log('Parse undefined:', JSON.stringify(s.safeParse(undefined)))
console.log('Parse null:', JSON.stringify(s.safeParse(null)))
console.log('Parse empty:', JSON.stringify(s.safeParse({})))
process.exit(0)
