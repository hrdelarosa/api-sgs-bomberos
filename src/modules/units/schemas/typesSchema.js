import { z } from 'zod'

export const typesSchema = z.object({
  nombre: z
    .string({ required_error: 'El tipo unidad es requerido' })
    .min(3, 'El tipo unidad debe de ser mayor a 3 caracteres')
    .max(25, 'El tipo unidad no puede exceder los 25 caracteres'),
})

export const updateTypeSchema = z.object({
  estado: z.string({ required_error: 'El estado es requerido' }).uuid(),
})
