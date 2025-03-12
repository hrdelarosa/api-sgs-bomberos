import { GuardsService } from '../services/guardsService.js'

export class GuardsController {
  constructor({ guardsModel }) {
    this.guardsService = new GuardsService({ guardsModel })
  }

  create = async (req, res) => {
    try {
      const { nombre, estacion } = req.body

      await this.guardsService.create({ nombre, estacion })

      res.status(201).json({ message: 'Guardia creado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear la guardia:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteGuard = async (req, res) => {
    try {
      const { id } = req.params

      await this.guardsService.deleteGuard({ id })

      res.status(200).json({ message: 'Guardia eliminada correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar la guardia:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getGuards = async (req, res) => {
    try {
      const guards = await this.guardsService.getGuards()

      res
        .status(200)
        .json({ message: 'Guardias obtenidas correctamente', guards })
    } catch (error) {
      console.error('Error en el controlador de obtener el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getGuardsPerStations = async (req, res) => {
    try {
      const { id } = req.params
      const guards = await this.guardsService.getGuardsPerStations({ id })

      res.status(200).json({
        message: 'Guardias vinculadas a la estacion obtenidas correctamente',
        guards,
      })
    } catch (error) {
      console.error('Error en el controlador de obtener el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
