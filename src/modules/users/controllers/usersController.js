import { UsersService } from '../services/usersService.js'

export class UsersController {
  constructor({ usersModel }) {
    this.usersService = new UsersService({ usersModel })
  }

  changeUserState = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.usersService.changeUserState({ id, estado })

      res
        .status(200)
        .json({
          message: 'Estado del usuario ha sido actualizado correctamente',
        })
    } catch (error) {
      console.error(
        'Error en el controlador de actualizar el estado del usuario:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changeUserRole = async (req, res) => {
    try {
      const { id } = req.params
      const { rol } = req.body

      await this.usersService.changeUserRole({ id, rol })

      res
        .status(200)
        .json({ message: 'Rol del usuario ha sido actualizado correctamente' })
    } catch (error) {
      console.error(
        'Error en el controlador de actualizar el rol del usuario:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params

      await this.usersService.deleteUser({ id })

      res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar el usuario:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.usersService.getUsers()

      res
        .status(200)
        .json({ message: 'Usuarios obtenidos correctamente', users })
    } catch (error) {
      console.error('Error en el controlador de obtener los usuarios:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
