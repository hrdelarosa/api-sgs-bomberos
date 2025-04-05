import { z } from 'zod'

export const registerSchema = z
  .object({
    nombres: z
      .string({ required_error: 'Los nombres/nombre es requerido' })
      .min(3, 'Los nombres/nombre debe de contener al menos 3 caracteres')
      .max(100, 'Los nombres/nombre no puede exceder los 50 caracteres')
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
    correo: z
      .string({ required_error: 'El correo es requerido' })
      .email({ message: 'Ingrese un correo válido' }),
    contraseña: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(6, 'La contraseña debe de tener al menos 6 caracteres')
      .max(30, 'La contraseña no puede exceder los 30 caracteres'),
    confirmarContraseña: z
      .string({ required_error: 'Es requerido confirmar la contraseña' })
      .min(6, {
        message: 'Confirmar contraseña debe de tener al menos 6 caracteres',
      })
      .max(30, {
        message: 'Confirmar contraseña no puede exceder los 30 caracteres',
      }),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarContraseña'],
  })

export const loginSchema = z.object({
  correo: z
    .string({ required_error: 'El correo es requerido' })
    .email({ message: 'Ingrese un correo válido' }),
  contraseña: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña es requerida'),
})

export const emailVerificationSchema = z.object({
  token: z
    .string({ required_error: 'El código es requerido' })
    .regex(/^\d{6}$/, {
      message: 'El código debe ser un número de 6 dígitos.',
    }),
})

export const resendEmailVerificationSchema = loginSchema.pick({
  correo: true,
})

export const requestPasswordResetSchema = loginSchema.pick({
  correo: true,
})

export const resetPasswordSchema = z
  .object({
    token: z
      .string({ required_error: 'El código es requerido' })
      .regex(/^\d{6}$/, {
        message: 'El código debe ser un número de 6 dígitos.',
      }),
    contraseña: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(6, 'La contraseña debe de tener al menos 6 caracteres')
      .max(30, 'La contraseña no puede exceder los 30 caracteres'),
    confirmarContraseña: z
      .string()
      .min(6, { message: 'La contraseña debe de tener al menos 6 caracteres' })
      .max(30, { message: 'La contraseña no puede exceder los 30 caracteres' }),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarContraseña'],
  })
