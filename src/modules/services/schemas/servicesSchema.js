import { z } from 'zod'

export const updateServiceSchema = z.object({
  estado: z.number({ required_error: 'El estado es requerido' }),
})
