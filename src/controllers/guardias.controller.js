export class GuardiasController {
  constructor({ guardiasModel }) {
    this.guardiasModel = guardiasModel
  }

  crearGuardia = async (req, res) => {
    try {
      const existeGuardi = await this.guardiasModel.obtenerPorGuardia({
        guardia: req.body.guardia,
      })

      if (existeGuardi)
        return res.status(400).json({ error: 'Esta guardia ya esta en uso' })

      await this.guardiasModel.crear({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado la guardia correctamente',
        data: { guardia: req.body.guardia },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear la nueva guardia: ${error}`,
      })
    }
  }

  eliminarGuardia = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.guardiasModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Guardia no encontrada' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar la guardia: ${error}`,
      })
    }
  }

  obtenerGuardias = async (req, res) => {
    try {
      const guardias = await this.guardiasModel.obtener()

      if (guardias.length === 0)
        return res.status(404).json({
          error: 'Guardias no encontradas. Aun no hay guardias guardadas',
        })

      res.status(200).json({
        message: 'Se han obtenido las guardias correctamente',
        data: guardias,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener las guardias: ${error}`,
      })
    }
  }
}
