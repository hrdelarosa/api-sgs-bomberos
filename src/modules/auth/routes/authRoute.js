import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import {
  emailVerificationSchema,
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
  resendEmailVerificationSchema,
  resetPasswordSchema,
} from '../schemas/authSchema.js'

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
  authRouter.get('/profile/:id', authController.profile)
  authRouter.get('/verify-token', authController.verifyToken)
  authRouter.post('/refresh-token', authController.refreshToken)
  authRouter.post(
    '/email-verification',
    validateSchema(emailVerificationSchema),
    authController.emailVerification
  )
  authRouter.post(
    '/resend-email-verification',
    validateSchema(resendEmailVerificationSchema),
    authController.resendEmailVerification
  )
  authRouter.post(
    '/request-password-reset',
    validateSchema(requestPasswordResetSchema),
    authController.requestPasswordReset
  )
  authRouter.post(
    '/reset-password',
    validateSchema(resetPasswordSchema),
    authController.resetPassword
  )

  return authRouter
}
