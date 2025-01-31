import { PersonalModel } from '../models/personal.model.js'

export class VacacionesController {
  constructor({ vacacionesModel }) {
    this.vacacionesModel = vacacionesModel
  }

  crearVacaciones = async (req, res) => {
    try {
      const personal = await PersonalModel.obtnerPorId({
        id: req.body.personal,
      })

      const vacaciones = await this.vacacionesModel.obtenerPorGuardiaVaca({
        guardia: personal.gu_nombre,
        inicio: req.body.inicio,
      })

      // Verificar si hay más de 4 bomberos de vacaciones
      const totalVacaciones = await this.vacacionesModel.obtener()
      if (totalVacaciones.length >= 4) {
        return res.status(400).json({
          error: 'No puede haber más de 4 bomberos de vacaciones a la vez',
        })
      }

      // Verificar si han pasado al menos 3 meses desde la última vacación
      const ultimaVacacion =
        await this.vacacionesModel.obtenerUltimaPorPersonal({
          personal: req.body.personal,
        })
      if (ultimaVacacion) {
        const tresMesesDespues = new Date(ultimaVacacion.va_final)
        tresMesesDespues.setMonth(tresMesesDespues.getMonth() + 3)
        if (new Date(req.body.inicio) < tresMesesDespues) {
          return res.status(400).json({
            error:
              'Debe esperar al menos 3 meses desde su última vacación para pedir otra',
          })
        }
      }

      // Verificar si hay otro sargento de vacaciones
      const contieneRan = vacaciones.some(
        (item) => item.ran_nombre === personal.ran_nombre
      )
      if (contieneRan)
        return res.status(400).json({
          error: `No puede pedir sus vacaciones, ya que un ${personal.ran_nombre} pidió las vacaciones el mismo día`,
        })

      // Verificar si el personal ya tiene vacaciones en la misma fecha
      const contienePer = vacaciones.some(
        (item) => item.per_np === personal.per_np
      )
      if (contienePer)
        return res.status(409).json({
          error:
            'El personal no puede pedir sus vacaciones 2 veces en la misma fecha',
        })

      // Calcular la fecha final de las vacaciones
      const diasVacaciones = 15 + (personal.per_diasAdicionales || 0)
      const fechaFinal = new Date(req.body.inicio)
      fechaFinal.setDate(fechaFinal.getDate() + diasVacaciones)

      if (personal.per_vacaciones > 0) {
        await this.vacacionesModel.crear({
          input: req.body,
          final: fechaFinal.toISOString().split('T')[0],
        })
        await PersonalModel.actualizarVacaciones({
          periodos: personal.per_vacaciones - 1,
          id: req.body.personal,
        })
      } else
        return res.status(400).json({
          error:
            'No es posible pedir sus vacaciones, ya que alcanzó su límite de 2 periodos al año',
        })

      res.status(200).json({
        message: 'Se ha creado la vacación correctamente',
        data: { dia: req.body.dia },
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al crear la nueva vacación: ${error}`,
      })
    }
  }

  eliminarVacaciones = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.vacacionesModel.eliminar({ id })

      if (result.affectedRows > 0) res.status(204).send()
      else res.status(404).json({ error: 'Vacación no encontrada' })
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar la vacación: ${error}`,
      })
    }
  }

  obtenerVacaciones = async (req, res) => {
    try {
      const vacaciones = await this.vacacionesModel.obtener()

      if (vacaciones.length === 0)
        return res.status(404).json({
          error: 'Vacaciones no encontradas. Aun no hay vacaciones guardadas',
        })

      res.status(200).json({
        message: 'Se han obtenido todas las vacaciones correctamente',
        data: vacaciones,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener todas las vacaciones: ${error}`,
      })
    }
  }
}
