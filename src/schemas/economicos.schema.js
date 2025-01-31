import { z } from 'zod'

export const economicosSchema = z.object({
  personal: z.string({ required_error: 'El personal es requerido' }).uuid(),
  dia: z.string({ required_error: 'El día es requerido' }).date(),
})
