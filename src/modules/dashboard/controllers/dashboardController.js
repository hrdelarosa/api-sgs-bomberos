import { DashboardService } from '../services/dashboardService.js'

export class DashboardController {
  constructor({ dashboardModel }) {
    this.dashboardModel = new DashboardService({ dashboardModel })
  }

  incidentesPorcentaje = async (req, res) => {
    try {
      const percentage = await this.dashboardModel.incidentesPorcentaje()

      res.status(200).json({
        message: 'Porcentaje de incidentes obtenidos correctamente',
        percentage,
      })
    } catch (error) {
      console.error(
        'Error en el controlador al obtener el porcentaje de los servicios:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  summaryOfServicesPerIncident = async (req, res) => {
    try {
      const summary = await this.dashboardModel.summaryOfServicesPerIncident()

      res.status(200).json({
        message: 'Resumen de los servicios obtenidos correctamente',
        summary,
      })
    } catch (error) {
      console.error(
        'Error en el controlador de obtener el resumen de los servicios:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  totalServicesMonthly = async (req, res) => {
    try {
      const servicesMonthly = await this.dashboardModel.totalServicesMonthly()

      res.status(200).json({
        message:
          'Porcentaje de servicios del mes actual en comparación al anterior obtenidos correctamente',
        servicesMonthly,
      })
    } catch (error) {
      console.error(
        'Error en el controlador al obtener el porcentaje de los servicios:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  servicesPerIncidentMonthly = async (req, res) => {
    try {
      const perIncidentMonthly =
        await this.dashboardModel.servicesPerIncidentMonthly()

      res.status(200).json({
        message:
          'Porcentaje de servicios por incidente del mes actual en comparación al anterior obtenidos correctamente',
        perIncidentMonthly,
      })
    } catch (error) {
      console.error(
        'Error en el controlador al obtener el porcentaje de los servicios por incidente:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  unitTypesPorcentaje = async (req, res) => {
    try {
      const percentage = await this.dashboardModel.unitTypesPorcentaje()

      res.status(200).json({
        message: 'Porcentaje de los tipos de unidad obtenidos correctamente',
        percentage,
      })
    } catch (error) {
      console.error(
        'Error en el controlador al obtener el porcentaje de los tipos de unidad:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  statusOfUnits = async (req, res) => {
    try {
      const statusUnits = await this.dashboardModel.statusOfUnits()

      res.status(200).json({
        message: 'Estado de las unidades obtenidos correctamente',
        statusUnits,
      })
    } catch (error) {
      console.error(
        'Error en el controlador al obtener el estado de las unidad:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  responseTimes = async (req, res) => {
    try {
      const times = await this.dashboardModel.responseTimes()

      res.status(200).json({
        message:
          'Tiempo respuesta promedio de los sevicios obtenidos correctamente',
        times,
      })
    } catch (error) {
      console.error(
        'Error en el controlador al obtener los tiempos de respuesta a los servicios:',
        error
      )
      res.status(error.statusCode || 500).json({ message: error.message })
    }
  }
}
