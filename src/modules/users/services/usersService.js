import customError from '../../../utils/customError.js'

export class UsersService {
  constructor({ usersModel }) {
    this.usersModel = usersModel
  }

  updateUser = async ({ id, estado, rol }) => {
    try {
      const userExists = await this.usersModel.findUserById({ id })

      if (userExists === null) customError('El usuario no existe', 404)
      if (userExists.est_id_us === estado && userExists.rol_id_us === rol)
        customError('Estas actualizando el usuario con los mismos datos', 409)

      if (userExists.est_nombre !== estado)
        await this.usersModel.updateStateById({ estado, id })
      if (userExists.rol_nombre !== rol)
        await this.usersModel.updateRoleById({ rol, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar el usuario:', error)
      throw error
    }
  }

  deleteUser = async ({ id }) => {
    try {
      const userExists = await this.usersModel.findUserById({ id })

      if (userExists === null) customError('El usuario no existe', 404)
      if (userExists.est_nombre === 'inactivo')
        customError('El usuario ya esta inactivo', 409)
      if (userExists.rol_nombre === 'administrador')
        customError('No se puede eliminar a un administrador', 409)

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

  getUserById = async ({ id }) => {
    try {
      const userExists = await this.usersModel.findUserById({ id })

      if (userExists === null) customError('El usuario no existe', 404)

      return userExists
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el usuario por el id:',
        error
      )
      throw error
    }
  }
}
