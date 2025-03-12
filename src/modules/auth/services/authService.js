import customError from '../../../utils/customError.js'
import { createAccessToken } from '../../../lib/jwt.js'
import { compareHashPassword } from '../../../utils/hashPassword.js'
import { sendVerificationEmail } from '../../../utils/sendEmail.js'

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

      await sendVerificationEmail({ correo, token })
    } catch (error) {
      console.error('Error en el servicio de registro:', error)
      throw error
    }
  }

  login = async ({ correo, contraseña }) => {
    try {
      const userExists = await this.authModel.findUserByEmail({ correo })

      if (!userExists) customError('El correo ya está registrado', 401)
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
}
