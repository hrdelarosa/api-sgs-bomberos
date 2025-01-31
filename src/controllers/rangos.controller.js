export class RangosController {
  constructor({ rangosModel }) {
    this.rangosModel = rangosModel
  }

  crearRango = async (req, res) => {
    try {
      const existeRango = await this.rangosModel.obtenerPorNombre({
        nombre: req.body.nombre,
      })

      if (existeRango)
        return res.status(400).json({ error: 'Este rango ya existe' })

      await this.rangosModel.crear({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado el rango correctamente',
        data: { rango: req.body.nombre },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear el nuevo rango: ${error}`,
      })
    }
  }

  eliminarRango = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.rangosModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Rango no encontrado' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar el rango: ${error}`,
      })
    }
  }

  obtnerRangos = async (req, res) => {
    try {
      const rangos = await this.rangosModel.obtener()

      if (rangos.length === 0)
        return res.status(404).json({
          error: 'Rangos no encontradas. Aun no hay rangos guardados',
        })

      res.status(200).json({
        message: 'Se han obtenido los rangos correctamente',
        data: rangos,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener los rangos: ${error}`,
      })
    }
  }
}
