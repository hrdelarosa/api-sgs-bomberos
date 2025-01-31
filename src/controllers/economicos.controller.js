import { PersonalModel } from '../models/personal.model.js'

export class EconomicosController {
  constructor({ economicosModel }) {
    this.economicosModel = economicosModel
  }

  crearDiaEconomico = async (req, res) => {
    try {
      const personal = await PersonalModel.obtnerPorId({
        id: req.body.personal,
      })

      const dias = await this.economicosModel.obtenerPorGuardiaDia({
        guardia: personal.gu_nombre,
        dia: req.body.dia,
      })
      if (dias.length >= 5)
        return res.status(400).json({
          error:
            'No es posible pedir su día económico ya que ese día llego a su líminte de 5',
        })

      const contienePer = dias.some((item) => item.per_np === personal.per_np)
      if (contienePer)
        return res.status(409).json({
          error:
            'El personal no puede pedir su día económico 2 veces el mismo día',
        })

      const contieneRan = dias.some(
        (item) => item.ran_nombre === personal.ran_nombre
      )
      if (contieneRan)
        return res.status(400).json({
          error: `No puede pedir su día económico, porque ya un ${personal.ran_nombre} pidio el mismo día`,
        })

      if (personal.per_diasEco > 0) {
        await this.economicosModel.crear({ input: req.body })
        await PersonalModel.actualizarDias({
          dias: personal.per_diasEco - 1,
          id: req.body.personal,
        })
      } else
        return res.status(400).json({
          error:
            'No es posible pedir su día, ya que alcazo su límite de 9 días',
        })

      res.status(200).json({
        message: 'Se ha creado el día económico correctamente',
        data: {
          nombre: `${personal.per_nombres} ${personal.per_apellidos}`,
          dia: req.body.dia,
        },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear el nuevo día económico: ${error}`,
      })
    }
  }

  eliminarDiaEconomico = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.economicosModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Día no encontrado' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar el día económico: ${error}`,
      })
    }
  }

  obtenerDiasEconomicos = async (req, res) => {
    try {
      const dias = await this.economicosModel.obtener()

      if (dias.length === 0)
        return res.status(404).json({
          error: 'Días no encontrados. Aun no hay días guardados',
        })

      res.status(200).json({
        message: 'Se han obtenido todos los días económicos correctamente',
        data: dias,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener todos los días económicos: ${error}`,
      })
    }
  }
}
