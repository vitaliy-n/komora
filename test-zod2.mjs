import { z } from 'zod'
const s = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  search: z.string().optional(),
  category: z.string().optional(),
})
const r = s.safeParse({})
console.log('Parse result:', JSON.stringify(r))
if (r.success) {
  console.log('page:', r.data.page, 'limit:', r.data.limit)
} else {
  console.log('Error:', r.error)
}
process.exit(0)
