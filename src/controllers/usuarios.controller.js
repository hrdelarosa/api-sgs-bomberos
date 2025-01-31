export class UsuariosController {
  constructor({ usuariosModel }) {
    this.usuariosModel = usuariosModel
  }

  actualizarUsuario = async (req, res) => {
    const { id } = req.params

    try {
      await this.usuariosModel.actualizar({ input: req.body, id })

      res.status(204).send()
    } catch (error) {
      res.status(500).json({
        message: `Error al actualizar el usuario: ${error}`,
      })
    }
  }

  eliminarUsuario = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.usuariosModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Usuario no encontrado' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar el usuario: ${error}`,
      })
    }
  }

  obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await this.usuariosModel.obtener()

      if (usuarios.length === 0)
        return res.status(404).json({
          error: 'Usuarios no encontrados. Aun no hay usuarios guardados',
        })

      res.status(200).json({
        message: 'Se han obtenido los usuarios correctamente',
        data: usuarios,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtner los usuarios: ${error}`,
      })
    }
  }
}
