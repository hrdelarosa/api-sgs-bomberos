import { StationService } from '../services/stationService.js'

export class StationsController {
  constructor({ stationsModel }) {
    this.stationsService = new StationService({ stationsModel })
  }

  create = async (req, res) => {
    try {
      const { nombre, ubicacion } = req.body

      await this.stationsService.create({ nombre, ubicacion })

      res.status(201).json({ message: 'Estación creada correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear la estación:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changeStationStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.stationsService.changeStationStatus({ id, estado })

      res
        .status(200)
        .json({ message: 'Estado de la estación actualizada correctamente' })
    } catch (error) {
      console.error('Error en el controlador de actualizar la estación:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteStation = async (req, res) => {
    try {
      const { id } = req.params

      await this.stationsService.deleteStation({ id })

      res.status(200).json({ message: 'Estación eliminada correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar la guardia:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getStations = async (req, res) => {
    try {
      const roles = await this.stationsService.getStations()

      res
        .status(200)
        .json({ message: 'Estaciones obtenidos correctamente', roles })
    } catch (error) {
      console.error('Error en el controlador de obtener las estaciones:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
