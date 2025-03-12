import { z } from 'zod'

export const guardsSchema = z.object({
  guardia: z
    .string({ required_error: 'El nombre de la guardia es requerido' })
    .min(3, 'El nombre de la guardia debe de ser mayor a 3 caracteres')
    .max(60, 'El nombre de la guardia no debe der ser mayor a 60 caracteres'),

  estacion: z.string({ required_error: 'La estación es requerida' }).uuid(),
})
