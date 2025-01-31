export class EstadosController {
  constructor({ estadosModel }) {
    this.estadosModel = estadosModel
  }

  obtenerEstados = async (req, res) => {
    try {
      const estados = await this.estadosModel.obtener()

      if (estados.length === 0)
        return res.status(404).json({ error: 'Estados no encontrados' })

      res.status(200).json({
        message: 'Se han obtenido los estados correctamente',
        data: estados,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener los estados: ${error.message}`,
      })
    }
  }

  obtenerEstadoPorId = async (req, res) => {
    const { id } = req.params

    try {
      const estado = await this.estadosModel.obtenerPorId({ id })

      if (!estado)
        return res.status(404).json({ error: 'Estado no encontrado' })

      res.status(200).json({
        message: 'Se ha obtenido el estado correctamente',
        data: estado,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener el estado: ${error.message}`,
      })
    }
  }

  obtenerEstadoPorNombre = async (req, res) => {
    const { nombre } = req.params

    try {
      const estado = await this.estadosModel.obtenerPorNombre({ nombre })

      if (!estado)
        return res.status(404).json({ error: 'Estado no encontrado' })

      res.status(200).json({
        message: 'Se ha obtenido el estado correctamente',
        data: estado,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener el estado: ${error.message}`,
      })
    }
  }
}
