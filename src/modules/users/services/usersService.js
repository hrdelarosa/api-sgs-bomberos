import customError from '../../../utils/customError.js'

export class UsersService {
  constructor({ usersModel }) {
    this.usersModel = usersModel
  }

  changeUserState = async ({ id, estado }) => {
    try {
      const userExists = await this.usersModel.findUserById({ id })

      if (userExists === null) customError('El usuario no existe', 404)

      await this.usersModel.updateStateById({ estado, id })
    } catch (error) {
      console.error(
        'Error en el servicio de actualizar el estado del usuario:',
        error
      )
      throw error
    }
  }

  changeUserRole = async ({ id, rol }) => {
    try {
      const userExists = await this.usersModel.findUserById({ id })

      if (userExists === null) customError('El usuario no existe', 404)

      await this.usersModel.updateRoleById({ rol, id })
    } catch (error) {
      console.error(
        'Error en el servicio de actualizar el rol del usuario:',
        error
      )
      throw error
    }
  }

  deleteUser = async ({ id }) => {
    try {
      const userExists = await this.usersModel.findUserById({ id })

      if (userExists === null) customError('El usuario no existe', 404)
      if (userExists.est_id_us === 'inactivo')
        customError('El usuario ya esta inactivo', 409)

      const countService = await this.usersModel.userRelatedService({ id })

      if (countService > 0)
        customError(
          'No se puede eliminar el usuario porque tiene servicios relacionados',
          409
        )

      await this.usersModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar el usuario:', error)
      throw error
    }
  }

  getUsers = async () => {
    try {
      const users = await this.usersModel.getUsers()

      if (users.length === 0) customError('Usuarios no encontrados', 404)

      return users
    } catch (error) {
      console.error('Error en el servicio de obtener los usuarios:', error)
      throw error
    }
  }
}
