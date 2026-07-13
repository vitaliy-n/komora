import { z } from 'zod'
const s = z.object({ page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(200).default(50) })
const r = s.safeParse({})
console.log(JSON.stringify(r, null, 2))
