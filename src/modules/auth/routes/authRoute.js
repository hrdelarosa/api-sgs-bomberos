import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { loginSchema, registerSchema } from '../schemas/authSchema.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ authModel })

  authRouter.post(
    '/register',
    validateSchema(registerSchema),
    authController.register
  )
  authRouter.post('/login', validateSchema(loginSchema), authController.login)
  authRouter.post('/logout', authController.logout)

  return authRouter
}
