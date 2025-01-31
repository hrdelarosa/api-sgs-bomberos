export class PersonalController {
  constructor({ personalModel }) {
    this.personalModel = personalModel
  }

  crearPersonal = async (req, res) => {
    try {
      const existePersonal = await this.personalModel.obtnerPorPersonal({
        np: req.body.np,
      })

      if (existePersonal)
        return res.status(400).json({ error: 'Este personal ya esta creado' })

      await this.personalModel.crear({ input: req.body })

      res.status(201).json({
        message: 'Se ha creado el personal correctamente',
        data: {
          personal: {
            nombre: `${req.body.nombres} ${req.body.apellidos}`,
            np: req.body.np,
          },
        },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear el nuevo personal: ${error}`,
      })
    }
  }

  eliminarPersonal = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.personalModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Personal no encontrado' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar el personal: ${error}`,
      })
    }
  }

  obtenerPersonal = async (req, res) => {
    try {
      const personal = await this.personalModel.obtener()

      if (personal.length === 0)
        return res.status(404).json({
          error: 'Personal no encontrado. Aun no hay personal guardado',
        })

      res.status(200).json({
        message: 'Se han obtenido a todo el personal correctamente',
        data: personal,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener a todo el personal: ${error}`,
      })
    }
  }

  obtenerPorGuardia = async (req, res) => {
    const { guard } = req.params

    try {
      const personal = await this.personalModel.obtnerPorGuardia({ guard })

      if (personal.length === 0)
        return res.status(404).json({
          error:
            'Personal no encontrado. Aun no hay personal vinculado a esa guardia',
        })

      res.status(200).json({
        message: 'Se han obtenido a todo el personal correctamente',
        data: personal,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener a todo el personal: ${error}`,
      })
    }
  }

  evitarPorGuardia = async (req, res) => {
    const { guard } = req.params

    try {
      const personal = await this.personalModel.obtnerExcluirPorGuardia({
        guard,
      })

      if (personal.length === 0)
        return res.status(404).json({
          error:
            'Personal no encontrado. Aun no hay personal vinculado a esa guardia',
        })

      res.status(200).json({
        message: 'Se han obtenido a todo el personal correctamente',
        data: personal,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener a todo el personal: ${error}`,
      })
    }
  }

  actualizarGuardPers = async (req, res) => {
    const { id } = req.params
    const { personal } = req.body

    try {
      if (personal && Array.isArray(personal) && personal.length > 0) {
        for (const persona of personal) {
          await this.personalModel.actualizarGuardia({ input: persona, id })
        }
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({
        message: `Error al actualizar la guardia del personal: ${error}`,
      })
    }
  }
}
