import customError from '../../../utils/customError.js'

export class DashboardService {
  constructor({ dashboardModel }) {
    this.dashboardModel = dashboardModel
  }

  incidentesPorcentaje = async () => {
    try {
      const percentage = await this.dashboardModel.getIncidentesPorcentaje()

      if (percentage.length === 0)
        customError('No se encontraron incidentes', 404)

      return percentage
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el porcentaje de los servicios:',
        error
      )
      throw error
    }
  }

  summaryOfServicesPerIncident = async () => {
    try {
      const total = await this.dashboardModel.getTotalServices()

      if (total.length === 0) customError('No se encontraron servicios', 404)

      const perIncident = await this.dashboardModel.getTotalServicesIncident()

      return { total, perIncident }
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el resumen de los servicios:',
        error
      )
      throw error
    }
  }

  totalServicesMonthly = async () => {
    try {
      const currentMonth =
        await this.dashboardModel.getTotalServicesCurrentMonth()
      const previousMonth =
        await this.dashboardModel.getTotalServicesPreviousMonth()

      if (currentMonth.length === 0)
        customError('No se encontraron servicios', 404)

      let porcentaje = 0

      if (previousMonth > 0)
        porcentaje = ((currentMonth - previousMonth) / previousMonth) * 100

      porcentaje = Math.round(porcentaje * 100) / 100

      return { currentMonth, previousMonth, porcentaje }
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el porcentaje de los servicios:',
        error
      )
      throw error
    }
  }

  servicesPerIncidentMonthly = async () => {
    try {
      const mostCurrentMonth =
        await this.dashboardModel.mostFrequentIncidentCurrentMonth()
      const mostPreviousMonth =
        await this.dashboardModel.mostFrequentIncidentPreviousMonth()

      if (mostCurrentMonth.length === 0)
        customError('No se encontraron servicios', 404)

      let porcentaje = 0

      if (mostPreviousMonth.cantidad > 0)
        porcentaje =
          ((mostCurrentMonth.cantidad - mostPreviousMonth.cantidad) /
            mostPreviousMonth.cantidad) *
          100

      porcentaje = Math.round(porcentaje * 100) / 100

      return { mostCurrentMonth, mostPreviousMonth, porcentaje }
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el resumen de los servicios por incidente:',
        error
      )
      throw error
    }
  }

  unitTypesPorcentaje = async () => {
    try {
      const percentage = await this.dashboardModel.getUnitTypesPorcentaje()

      if (percentage.length === 0)
        customError('No se encontraron los tipos de unidades', 404)

      return percentage
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el porcentaje de los tipos de unidad:',
        error
      )
      throw error
    }
  }

  statusOfUnits = async () => {
    try {
      const units = await this.dashboardModel.getStateUnits()

      if (units.length === 0) customError('No se encontraron unidades', 404)

      return units
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el estado de las unidades:',
        error
      )
      throw error
    }
  }

  responseTimes = async () => {
    try {
      const averageResponseTime =
        await this.dashboardModel.getAverageResponseTime()
      const averageControlTime =
        await this.dashboardModel.getAverageControlTime()
      const overallAverageTime =
        await this.dashboardModel.getOverallAverageTime()

      return { averageResponseTime, averageControlTime, overallAverageTime }
    } catch (error) {
      console.error(
        'Error en el servicio de obtener los tiempos de respuesta a los servicios:',
        error
      )
      throw error
    }
  }
}
