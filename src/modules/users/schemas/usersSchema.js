import { z } from 'zod'

export const updateUserSchema = z.object({
  estado: z.number({ required_error: 'El rol es requerido' }),
  rol: z.number({ required_error: 'El rol es requerido' }),
})
