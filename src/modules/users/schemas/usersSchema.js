import { z } from 'zod'

export const updateUserStateSchema = z.object({
  estado: z.number({ required_error: 'El rol es requerido' }),
})
export const updateUserRoleSchema = z.object({
  rol: z.number({ required_error: 'El rol es requerido' }),
})
