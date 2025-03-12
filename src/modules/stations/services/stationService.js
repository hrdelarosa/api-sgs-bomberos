import customError from '../../../utils/customError.js'

export class StationService {
  constructor({ stationsModel }) {
    this.stationsModel = stationsModel
  }

  create = async ({ nombre, ubicacion }) => {
    try {
      const stationExists = await this.stationsModel.findStationByName({
        nombre,
      })

      if (stationExists) customError('La estación ya existe', 409)

      await this.stationsModel.create({ nombre, ubicacion })
    } catch (error) {
      console.error('Error en el servicio de crear la estación:', error)
      throw error
    }
  }

  changeStationStatus = async ({ id, estado }) => {
    try {
      const stationExists = await this.stationsModel.findStationById({ id })

      if (stationExists === null) customError('La estación no existe', 404)

      await this.stationsModel.updateStatusById({ estado, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar la estación:', error)
      throw error
    }
  }

  deleteStation = async ({ id }) => {
    try {
      const stationExists = await this.stationsModel.findStationById({ id })

      if (stationExists === null) customError('La estación no existe', 404)
      if (stationExists.est_id_et === 'inactivo')
        customError('La estación ya esta inactiva', 409)

      const countUnits = await this.stationsModel.estationRelatedGuard({ id })

      if (countUnits > 0)
        customError(
          'No se puede eliminar la estación porque tiene guardias relacionadas',
          409
        )

      await this.stationsModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar la guardia:', error)
      throw error
    }
  }

  getStations = async () => {
    try {
      const stations = await this.stationsModel.getStations()

      if (stations.length === 0) customError('Estaciones no encontradas', 404)

      return stations
    } catch (error) {
      console.error('Error en el servicio de obtener las estaciones:', error)
      throw error
    }
  }
}
