export class EstacionesController {
  constructor({ estacionesModel }) {
    this.estacionesModel = estacionesModel
  }

  crearEstacion = async (req, res) => {
    try {
      const existeEstacion = await this.estacionesModel.obtenerPorEstacion({
        nombre: req.body.nombre,
      })

      if (existeEstacion)
        return res.status(400).json({ error: 'Esta estación ya esta creada' })

      await this.estacionesModel.crear({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado la estación correctamente',
        data: { estacion: req.body.nombre },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear la nueva guardia: ${error}`,
      })
    }
  }

  eliminarEstacion = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.estacionesModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Estación no encontrada' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar la estación: ${error}`,
      })
    }
  }

  obtenerEstaciones = async (req, res) => {
    try {
      const estaciones = await this.estacionesModel.obtener()

      if (estaciones.length === 0)
        return res.status(404).json({
          error: 'Estaciones no encontradas. Aun no hay estaciones guardadas',
        })

      res.status(200).json({
        message: 'Se han obtenido las estaciones correctamente',
        data: estaciones,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener las estaciones: ${error}`,
      })
    }
  }

  obtenerEstacionPorNom = async (req, res) => {
    const { nombre } = req.params

    try {
      const estacion = await this.estacionesModel.obtenerPorEstacion({ nombre })

      if (estacion.length === 0)
        return res.status(404).json({
          error: 'Estacion no encontrada. Aun no hay estaciones guardadas',
        })

      res.status(200).json({
        message: 'Se han obtenido las estaciones correctamente',
        data: estacion,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener las estaciones: ${error}`,
      })
    }
  }
}
