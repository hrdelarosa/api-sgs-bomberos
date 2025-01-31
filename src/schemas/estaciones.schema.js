import { z } from 'zod'

export const estacionesSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre de la guardia es requerido' })
    .min(3, 'El nombre del rol debe de ser mayor a 3 caracteres')
    .max(75, 'El nombre del rol no debe der ser mayor a 60 caracteres'),
  ubicacion: z
    .string({ required_error: 'La ubicación es requerida' })
    .min(5, 'La ubicación debe de ser mayor a 5 caracteres')
    .max(250, 'La ubicación no debe de ser mayor a 250 caracteres'),
  estado: z.string({ required_error: 'El estado es requerido' }).uuid(),
})
