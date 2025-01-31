import { z } from 'zod'

export const rolesSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre del rol es requerido' })
    .min(3, 'El nombre del rol debe de ser mayor a 3 caracteres')
    .max(60, 'El nombre del rol no debe der ser mayor a 60 caracteres'),

  descripcion: z
    .string({ required_error: 'La descripción del rol es requerida' })
    .min(5, 'La descripción del rol debe de ser mayor a 5 caracteres'),
})
