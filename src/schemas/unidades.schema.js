import { z } from 'zod'

export const unidadesSchema = z.object({
  tipo: z.string({ required_error: 'El tipo de unidad es requerido' }).uuid(),
  unidad: z
    .string({ required_error: 'El numero de la unidad es requerido' })
    .min(1, 'El numero debe de ser mayor a 1 caracteres')
    .max(8, 'El numero no puede exceder los 8 caracteres'),
  estado: z.string({ required_error: 'El estado es requerido' }).uuid(),
})

export const actuUnidadSchema = unidadesSchema.pick({
  estado: true,
})

export const tipoSchema = z.object({
  tipo: z
    .string({ required_error: 'El tipo de unidad es requerido' })
    .min(3, 'El tipo de unidad debe de ser mayor a 3 caracteres')
    .max(25, 'El numero no puede exceder los 25 caracteres'),
})
