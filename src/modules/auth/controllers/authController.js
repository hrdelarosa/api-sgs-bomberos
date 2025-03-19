import { AuthService } from '../services/authService.js'

export class AuthController {
  constructor({ authModel }) {
    this.authService = new AuthService({ authModel })
  }

  register = async (req, res) => {
    try {
      const { nombres, apellidos, correo, contraseña } = req.body

      await this.authService.register({
        nombres,
        apellidos,
        correo,
        contraseña,
      })

      res.status(201).json({
        message:
          'Usuario creado exitosamente, por favor verifique su correo electrónico',
      })
    } catch (error) {
      console.error('Error en el controlador de registro:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  login = async (req, res) => {
    try {
      const { correo, contraseña } = req.body
      const token = await this.authService.login({ correo, contraseña })

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      })
      res.status(200).json({ message: 'Inicio de sesión exitoso' })
    } catch (error) {
      console.error('Error en el controlador de inicio de sesión:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  logout = async (req, res) => {
    res.cookie('token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    })

    return res.status(200).json({ message: 'Cierre de sesión exitoso' })
  }

  profile = async (req, res) => {
    try {
      const { id } = req.params
      const profile = await this.authService.profile({ id })

      res.status(200).json({ message: 'Perfil obtenido exitosamente', profile })
    } catch (error) {
      console.error('Error en el controlador del perfil:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  verifyToken = async (req, res) => {
    try {
      const { token } = req.cookies
      const decoded = await this.authService.verifyToken({ token })

      res.status(200).json({ message: 'Token válido', decoded })
    } catch (error) {
      console.error('Error en el controlador de verificación del token:', error)
      res.status(error.statusCode || 401).json({ message: error.message })
    }
  }

  refreshToken = async (req, res) => {
    try {
      const { token } = req.cookies
      const newToken = await this.authService.refreshToken({ token })

      res.cookie('token', newToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      })
      res.status(200).json({ message: 'Token refrescado exitosamente' })
    } catch (error) {
      console.error('Error en el controlador de refresco de token:', error)
      res.status(error.statusCode || 401).json({ message: error.message })
    }
  }

  emailVerification = async (req, res) => {
    try {
      const { token } = req.body

      await this.authService.emailVerification({ token })

      res.status(200).json({ message: 'Correo verificado exitosamente' })
    } catch (error) {
      console.error('Error en el controlador de verificación de correo:', error)
      res.status(error.statusCode || 401).json({ message: error.message })
    }
  }

  resendEmailVerification = async (req, res) => {
    try {
      const { correo } = req.body

      await this.authService.resendEmailVerification({ correo })

      res
        .status(200)
        .json({ message: 'Nuevo correo de verificación enviado exitosamente' })
    } catch (error) {
      console.error(
        'Error en el controlador de reenvio de verificar el correo:',
        error
      )
      res.status(error.statusCode || 401).json({ message: error.message })
    }
  }

  requestPasswordReset = async (req, res) => {
    try {
      const { correo } = req.body

      await this.authService.requestPasswordReset({ correo })

      res.status(200).json({
        message:
          'Se ha enviado un correo con instrucciones para restablecer tu contraseña',
      })
    } catch (error) {
      console.error(
        'Error en el controlador de solicitud de token para restablecimineto de contraseña:',
        error
      )
      res.status(error.statusCode || 401).json({ message: error.message })
    }
  }

  resetPassword = async (req, res) => {
    try {
      const { token, contraseña } = req.body

      await this.authService.resetPassword({ token, contraseña })

      res.status(200).json({ message: 'Contraseña actualizada exitosamente' })
    } catch (error) {
      console.error(
        'Error en el controlador de restablecimineto de contraseña:',
        error
      )
      res.status(error.statusCode || 401).json({ message: error.message })
    }
  }
}
