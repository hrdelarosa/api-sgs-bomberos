export class UnidadesControllers {
  constructor({ unidadesModel }) {
    this.unidadesModel = unidadesModel
  }

  crearUnidad = async (req, res) => {
    try {
      const existeUnidad = await this.unidadesModel.obtenerPorUnidad({
        unidad: req.body.unidad,
      })

      if (existeUnidad)
        return res
          .status(409)
          .json({ error: 'El numero de unidad ya esta en uso' })

      await this.unidadesModel.crear({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado la unidad correctamente',
        data: { unidad: req.body.unidad },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear la nueva unidad: ${error}`,
      })
    }
  }

  actualizarUnidad = async (req, res) => {
    const { id } = req.params

    try {
      await this.unidadesModel.actualizar({
        input: req.body,
        id,
      })

      res.status(204).send()
    } catch (error) {
      res.status(500).json({
        message: `Error al actualizar la unidad: ${error}`,
      })
    }
  }

  eliminarUnidad = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.unidadesModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Unidad no encontrada' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar la unidad: ${error}`,
      })
    }
  }

  obtenerUnidades = async (req, res) => {
    try {
      const unidades = await this.unidadesModel.obtener()

      if (unidades.length === 0)
        return res.status(404).json({
          error: 'Unidades no encontradas. Aun no hay unidades guardadas',
        })

      res.status(200).json({
        message: 'Se han obtenido las unidades correctamente',
        data: unidades,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener las unidad: ${error}`,
      })
    }
  }

  crearTipo = async (req, res) => {
    try {
      const existeTipo = await this.unidadesModel.obtenerPorTipo({
        tipo: req.body.tipo,
      })

      if (existeTipo)
        return res.status(409).json({ error: 'El tipo de unidad ya existe' })

      await this.unidadesModel.crearTipo({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado el tipo de unidad correctamente',
        data: { nombre: req.body.tipo },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear el nuevo tipo de unidad: ${error}`,
      })
    }
  }

  eliminarTipo = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.unidadesModel.eliminarTipo({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Tipo de unidad no encontrada' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar el tipo de unidad: ${error}`,
      })
    }
  }

  obtenerTipos = async (req, res) => {
    try {
      const tipos = await this.unidadesModel.obtenerTipos()

      if (tipos.length === 0)
        return res.status(404).json({
          error: 'tipos no encontrados. Aun no hay tipos de unidades guardados',
        })

      res.status(200).json({
        message: 'Se han obtenido los tipo de unidades',
        data: tipos,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener los tipos de unidad: ${error}`,
      })
    }
  }
}
