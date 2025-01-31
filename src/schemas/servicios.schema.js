import { z } from 'zod'

export const servicioSchema = z.object({
  nombre: z
    .string()
    .max(100, 'El nombre no puede exceder los 100 caracteres')
    .optional()
    .refine(
      (value) => !value || /^[a-zA-ZÀ-ÿ\s]{3,100}$/.test(value),
      'El nombre solo puede tener letras y espacios'
    )
    .refine(
      (value) => !value || value.length >= 3,
      'El nombre debe de contener al menos 3 caracteres'
    ),
  telefono: z
    .string()
    .max(15, 'El teléfono no debe exceder los 15 dígitos')
    .optional()
    .refine(
      (value) => !value || /^\d+$/.test(value),
      'El teléfono debe contener solo números'
    )
    .refine(
      (value) => !value || value.length >= 10,
      'El teléfono debe tener al menos 10 dígitos'
    ),
  salida: z
    .string({ required_error: 'La salida es requerida' })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      'El campo debe estar en formato HH:mm'
    ),
  llegada: z
    .string({ required_error: 'La llegada es requerida' })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      'El campo debe estar en formato HH:mm'
    ),
  control: z
    .string({ required_error: 'La control es requerida' })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      'El campo debe estar en formato HH:mm'
    ),
  base: z
    .string({ required_error: 'La base es requerida' })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      'El campo debe estar en formato HH:mm'
    ),
  incidente: z.enum([
    'incendio',
    'fuga o derrame',
    'abejas',
    'rescate',
    'otro',
  ]),
  ubicacion: z
    .string()
    .max(255, 'La ubicación no debe exceder los 255 caracteres')
    .optional(),
  otro: z
    .string()
    .max(255, 'El campo de otro no debe exceder los 255 caracteres')
    .optional(),
  observaciones: z.string().optional(),
})
