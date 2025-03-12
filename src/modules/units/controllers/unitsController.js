import { UnitsService } from '../services/unitsService.js'

export class UnitsContoller {
  constructor({ unitsModel }) {
    this.unitsService = new UnitsService({ unitsModel })
  }

  create = async (req, res) => {
    try {
      const { tipo, numero } = req.body

      await this.unitsService.create({ tipo, numero })

      res.status(201).json({ message: 'Unidad creada correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear una unidad:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changeUnitStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.unitsService.changeUnitStatus({ id, estado })

      res
        .status(200)
        .json({ message: 'Estado de la unidad actualizado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de actualizar la unidad:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteUnit = async (req, res) => {
    try {
      const { id } = req.params

      await this.unitsService.deleteUnit({ id })

      res.status(200).json({ message: 'Unidad eliminada correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar la unidad:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getUnits = async (req, res) => {
    try {
      const units = await this.unitsService.getUnits()

      res
        .status(200)
        .json({ message: 'Unidades obtenidas correctamente', units })
    } catch (error) {
      console.error('Error en el controlador de obtener las unidades:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
