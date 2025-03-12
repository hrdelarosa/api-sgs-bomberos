import customError from '../../../utils/customError.js'

export class RolesService {
  constructor({ rolesModel }) {
    this.rolesModel = rolesModel
  }

  create = async ({ nombre, descripcion }) => {
    try {
      const roleExists = await this.rolesModel.findRoleByName({ nombre })

      if (roleExists) customError('El rol ya existe', 409)

      await this.rolesModel.create({ nombre, descripcion })
    } catch (error) {
      console.error('Error en el servicio de crear rol:', error)
      throw error
    }
  }

  changeRoleStatus = async ({ id, estado }) => {
    try {
      const roleExists = await this.rolesModel.findRoleById({ id })

      if (roleExists === null) customError('El rol no existe', 404)

      await this.rolesModel.updateStatusById({ estado, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar el rol:', error)
      throw error
    }
  }

  getRoles = async () => {
    try {
      const roles = await this.rolesModel.getRoles()

      if (roles.length === 0) customError('Roles no encontrados', 404)

      return roles
    } catch (error) {
      console.error('Error en el servicio de obtener los roles:', error)
      throw error
    }
  }
}
