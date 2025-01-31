import { z } from 'zod'

export const rangosSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre del rango es requerido' })
    .min(3, 'El nombre del rango debe de ser mayor a 3 caracteres')
    .max(30, 'El nombre del rango no debe der ser mayor a 60 caracteres'),
})
