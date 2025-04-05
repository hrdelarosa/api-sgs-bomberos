import { z } from 'zod'

export const unitsSchema = z.object({
  tipo: z.number({ required_error: 'El tipo de unidad es requerido' }),
  numero: z
    .string({ required_error: 'El numero de la unidad es requerido' })
    .min(1, 'El numero debe de ser mayor a 1 caracteres')
    .max(8, 'El numero no puede exceder los 8 caracteres'),
})

export const updateUnitSchema = z.object({
  estado: z.number({ required_error: 'El estado es requerido' }),
})
