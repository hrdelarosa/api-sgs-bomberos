import { z } from 'zod'

export const personnelSchema = z.object({
  nombre: z
    .string({ required_error: 'Los nombres/nombre es requerido' })
    .min(3, 'Los nombres/nombre debe de contener al menos 3 caracteres')
    .max(50, 'Los nombres/nombre no puede exceder los 50 caracteres')
    .regex(
      /^[a-zA-ZÀ-ÿ\s]{3,100}$/,
      'El nombre solo puede tener letras y espacios'
    ),
  apellidos: z
    .string({ required_error: 'Los apellidos son requeridos' })
    .min(4, 'Los apellidos debe de contener al menos 4 caracteres')
    .max(100, 'Los apellidos no puede exceder los 50 caracteres')
    .regex(
      /^[a-zA-ZÀ-ÿ\s]{3,100}$/,
      'El nombre solo puede tener letras y espacios'
    ),
  np: z
    .string({ required_error: 'El numero del personal es requerida' })
    .min(3, 'El numero del personal debe de ser mayor a 3')
    .max(8, 'El numero del personal debe de ser menor a 8'),
  rango: z.number({ required_error: 'El rago es requerido' }),
  base: z.enum(['supernumerario', 'sindicalizado'], {
    required_error: 'La base es requerida',
  }),
  guardia: z.number({ required_error: 'La guardia es requerido' }),
})

export const updateStateSchema = z.object({
  estado: z.number({ required_error: 'El estado es requerido' }),
})

export const updateRankSchema = personnelSchema.pick({
  rango: true,
})

export const updateGuardSchema = personnelSchema.pick({
  guardia: true,
})
