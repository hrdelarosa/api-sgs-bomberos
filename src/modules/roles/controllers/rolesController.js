import { RolesService } from '../services/rolesService.js'

export class RolesController {
  constructor({ rolesModel }) {
    this.rolesService = new RolesService({ rolesModel })
  }

  create = async (req, res) => {
    try {
      const { nombre, descripcion } = req.body

      await this.rolesService.create({ nombre, descripcion })

      res.status(201).json({ message: 'Rol creado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear rol:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changeRoleStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.rolesService.changeRoleStatus({ id, estado })

      res
        .status(200)
        .json({ message: 'Estado del rol actualizado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de actualizar el rol:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getRoles = async (req, res) => {
    try {
      const roles = await this.rolesService.getRoles()

      res.status(200).json({ message: 'Roles obtenidos correctamente', roles })
    } catch (error) {
      console.error('Error en el controlador de obtener los roles:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
