export class RolesController {
  constructor({ rolesModel }) {
    this.rolesModel = rolesModel
  }

  crearRole = async (req, res) => {
    try {
      const existeRole = await this.rolesModel.obtenerPorNombre({
        nombre: req.body.nombre,
      })

      if (existeRole)
        return res
          .status(409)
          .json({ error: 'El rol duplicado, este ya se ha creado' })

      await this.rolesModel.crear({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado el rol correctamente',
        data: { rol: req.body.nombre },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear el nuevo rol: ${error}`,
      })
    }
  }

  eliminarRole = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.rolesModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Rol no encontrado' })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear el nuevo rol: ${error.message}`,
      })
    }
  }

  obtenerRoles = async (req, res) => {
    try {
      const roles = await this.rolesModel.obtener()

      if (roles.length === 0)
        return res
          .status(404)
          .json({ error: 'Roles no encontrados. Aun no hay roles guardados' })

      res.status(200).json({
        message: 'Se han obtenido los roles correctamente',
        data: roles,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener los roles: ${error.message}`,
      })
    }
  }

  // obtenerEstadoPorNombre = async (req, res) => {
  //   con
  // }
}
