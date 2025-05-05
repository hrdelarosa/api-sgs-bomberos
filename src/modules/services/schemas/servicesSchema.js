import { z } from 'zod'

export const servicesSchema = z.object({
  incidente: z.enum([
    'incendio',
    'fuga o derrame',
    'abejas',
    'rescate',
    'otro',
  ]),
  personal: z
    .array(z.string())
    .min(1, 'Debe asignar al menos una persona al servicio'),
  unidades: z
    .array(z.string())
    .min(1, 'Debe asignar al menos una unidad al servicio'),
})

export const updateServiceSchema = z.object({
  estado: z.number({ required_error: 'El estado es requerido' }),
})
