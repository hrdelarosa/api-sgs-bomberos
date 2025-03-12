import { z } from 'zod'

export const updateUserStateSchema = z.object({
  estado: z.string({ required_error: 'El estado es requerido' }).uuid(),
})
export const updateUserRoleSchema = z.object({
  rol: z.string({ required_error: 'El rol es requerido' }).uuid(),
})
