import { z } from 'zod'

export const vacacionesSchema = z.object({
  personal: z.string({ required_error: 'El personal es requerido' }).uuid(),
  inicio: z.string({ required_error: 'El día de inicio es requerido' }).date(),
})
