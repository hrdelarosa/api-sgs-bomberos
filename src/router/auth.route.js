import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import {
  loginSchema,
  registerSchema,
  resetPassSchema,
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
  authRouter.get('/verify-email/:token', authController.verifyEmail)
  // Solicita un token para poder cambiar la contraseña
  authRouter.post(
    '/request-password-reset',
    authRequired,
    authController.requestPasswordReset
  )
  // Cambiar la contraseña
  authRouter.post(
    '/reset-password/:token',
    authRequired,
    validateSchema(resetPassSchema),
    authController.resetPassword
  )

  return authRouter
}
