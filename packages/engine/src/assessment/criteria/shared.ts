import { z } from 'zod'

export const bandSchema = z.object({
  min: z.number().optional(),
  idealMin: z.number().optional(),
  idealMax: z.number().optional(),
  max: z.number().optional(),
})
