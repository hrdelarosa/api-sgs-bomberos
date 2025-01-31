import { z } from 'zod'

export const usuariosSchema = z
  .object({
    rol: z.string().optional(),
    estado: z.string().optional(),
  })
  .refine((data) => data.rol !== undefined || data.estado !== undefined, {
    message: 'Debes de introducir al menos uno de los campos: rol o estado',
  })
