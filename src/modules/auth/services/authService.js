import customError from '../../../utils/customError.js'
import {
  createAccessToken,
  verifyToken,
  refreshToken,
} from '../../../lib/tokens-jwt.js'
import { compareHashPassword } from '../../../utils/hashPassword.js'
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../../../utils/sendEmail.js'

export class AuthService {
  constructor({ authModel }) {
    this.authModel = authModel
  }

  register = async ({ nombres, apellidos, correo, contraseña }) => {
    try {
      const userExists = await this.authModel.findUserByEmail({ correo })

      if (userExists) customError('El correo ya está registrado', 409)

      const token = await this.authModel.create({
        nombres,
        apellidos,
        correo,
        contraseña,
      })

      await sendVerificationEmail({ nombres, correo, token })
    } catch (error) {
      console.error('Error en el servicio de registro:', error)
      throw error
    }
  }

  login = async ({ correo, contraseña }) => {
    try {
      const userExists = await this.authModel.findUserByEmail({ correo })

      if (!userExists) customError('Correo o contraseña incorrectos', 401)
      if (!userExists.us_verificado) customError('Correo no verificado', 403)
      if (userExists.est_id_us === 'inactivo')
        customError(
          'Tu cuenta está desactivada, contacta con un adminstrador para más información',
          403
        )

      const isMatch = await compareHashPassword({
        contraseña,
        hash: userExists.us_contraseña,
      })
      if (!isMatch) customError('Correo o contraseña incorrectos', 401)

      const token = await createAccessToken({
        id: userExists.id,
        us_correo: userExists.us_correo,
      })

      return token
    } catch (error) {
      console.error('Error en el servicio de registro:', error)
      throw error
    }
  }

  profile = async ({ id }) => {
    try {
      const profile = await this.authModel.getProfileById({ id })

      if (!profile) customError('Usuario no encontrado', 404)

      return profile
    } catch (error) {
      console.error('Error en el servicio de registro:', error)
      throw error
    }
  }

  verifyToken = async ({ token }) => {
    try {
      if (!token) customError('Token no proporcionado', 401)

      const decoded = await verifyToken(token)

      if (!decoded) customError('Token inválido o expirado', 401)

      const user = await this.authModel.findUserById({ id: decoded.id })

      if (!user) customError('Usuario no encontrado', 404)

      return { decoded, user }
    } catch (error) {
      console.error('Error en el servicio de la verificación del token:', error)
      throw error
    }
  }

  refreshToken = async ({ token }) => {
    try {
      const newToken = await refreshToken(token)

      if (!newToken) customError('Token inválido o expirado', 401)

      return newToken
    } catch (error) {
      console.error('Error en el servicio de refresco de token:', error)
      throw error
    }
  }

  emailVerification = async ({ token }) => {
    try {
      const userExists = await this.authModel.findUserByVerificationToken({
        token,
      })

      if (!userExists) customError('Código de verificación expirado o inválido')

      await this.authModel.checkEmail({ token })
    } catch (error) {
      console.error('Error en el servicio de verificación de correo:', error)
      throw error
    }
  }

  resendEmailVerification = async ({ correo }) => {
    try {
      const userExists = await this.authModel.findUserByEmail({ correo })

      if (!userExists) customError('Usuario no encontrado', 404)
      if (userExists.us_verificado === '1')
        customError('El usuario ya esta verificado', 409)

      const token = await this.authModel.updateVerificationToken({ correo })

      await sendVerificationEmail({ correo, token })
    } catch (error) {
      console.error(
        'Error en el servicio de reenvio de verificar el correo:',
        error
      )
      throw error
    }
  }

  requestPasswordReset = async ({ correo }) => {
    try {
      const userExists = await this.authModel.findUserByEmail({ correo })

      if (!userExists) customError('Usuario no encontrado', 404)
      if (userExists.us_verificado === '0')
        customError('El usuario no esta verificado', 409)

      const token = await this.authModel.savePasswordResetToken({ correo })

      await sendPasswordResetEmail({ correo, token })
    } catch (error) {
      console.error(
        'Error en el servicio de solicitud de token para restablecimineto de contraseña:',
        error
      )
      throw error
    }
  }

  resetPassword = async ({ token, contraseña }) => {
    try {
      const userExists = await this.authModel.findUserByResetToken({ token })

      if (!userExists) customError('Usuario no encontrado', 404)

      await this.authModel.updatePassword({
        correo: userExists.us_correo,
        contraseña,
      })
    } catch (error) {
      console.error(
        'Error en el servicio de restablecimineto de contraseña:',
        error
      )
      throw error
    }
  }
}
