import { UsersService } from '../services/usersService.js'

export class UsersController {
  constructor({ usersModel }) {
    this.usersService = new UsersService({ usersModel })
  }

  updateUser = async (req, res) => {
    try {
      const { id } = req.params
      const { estado, rol } = req.body

      await this.usersService.updateUser({ id, estado, rol })

      res.status(200).json({
        message: 'Usuario ha sido actualizado correctamente',
      })
    } catch (error) {
      console.error('Error en el controlador de actualizar el usuario:', error)
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

  getUserById = async (req, res) => {
    try {
      const { id } = req.params
      const user = await this.usersService.getUserById({ id })

      res.status(200).json({ message: 'Usuairo obtenido correctamente', user })
    } catch (error) {
      console.error(
        'Error en el controlador de obtener el usuario por el id:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
