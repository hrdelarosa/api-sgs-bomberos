import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import {
  loginSchema,
  registerSchema,
  requestWithEmail,
  resetPassSchema,
  verifyEmailSchema,
} from '../schemas/auth.schema.js'
import { authRequired } from '../middleware/auth.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ authModel })

  authRouter.post(
    '/register',
    validateSchema(registerSchema),
    authController.register
  )
  authRouter.post('/login', validateSchema(loginSchema), authController.login)
  authRouter.post('/logout', authRequired, authController.logout)
  authRouter.get('/profile/:id', authRequired, authController.profile)
  // Configurar perfil
  authRouter.get(
    '/profile/settings/:id',
    authRequired,
    authController.profileSettings
  )
  // Verifica el token(cookie) para ver si el usuario ha iniciado sesión
  authRouter.get('/verify-token', authController.verifyToken)
  // Refresca el token(cookie) si el usuario esta activo en la apliación
  authRouter.post('/refresh-token', authController.refreshToken)
  // Verificar el correo electronico por medio de un token
  authRouter.post(
    '/verify-email',
    validateSchema(verifyEmailSchema),
    authController.verifyEmail
  )
  // Reenviar el correo de verificación
  authRouter.post(
    '/resend-verify-email',
    validateSchema(requestWithEmail),
    authController.resendVerificationEmail
  )
  // Solicita un token para poder cambiar la contraseña
  authRouter.post(
    '/request-password-reset',
    validateSchema(requestWithEmail),
    authController.requestPasswordReset
  )
  // Cambiar la contraseña
  authRouter.post(
    '/reset-password',
    validateSchema(resetPassSchema),
    authController.resetPassword
  )

  return authRouter
}
