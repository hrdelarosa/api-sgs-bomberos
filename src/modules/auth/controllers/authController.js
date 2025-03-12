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

      res.cookie('token', token)
      res.status(200).json({ message: 'Inicio de sesión exitoso' })
    } catch (error) {
      console.error('Error en el controlador de inicio de sesión:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  logout = async (req, res) => {
    res.cookie('token', '', {
      expires: new Date(0),
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
}
