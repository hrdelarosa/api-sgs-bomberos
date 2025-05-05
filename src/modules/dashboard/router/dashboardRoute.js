import { Router } from 'express'
import { DashboardController } from '../controllers/dashboardController.js'

export const createDashboardRouter = ({ dashboardModel }) => {
  const dashboardRouter = Router()

  const dashboardController = new DashboardController({ dashboardModel })

  dashboardRouter.get(
    '/services-incident-porcentaje',
    dashboardController.incidentesPorcentaje
  )
  dashboardRouter.get(
    '/summary-per-incident',
    dashboardController.summaryOfServicesPerIncident
  )
  dashboardRouter.get(
    '/services-monthly',
    dashboardController.totalServicesMonthly
  )
  dashboardRouter.get(
    '/services-per-incident-monthly',
    dashboardController.servicesPerIncidentMonthly
  )
  dashboardRouter.get(
    '/unit-types-porcentaje',
    dashboardController.unitTypesPorcentaje
  )
  dashboardRouter.get('/unit-status', dashboardController.statusOfUnits)
  dashboardRouter.get('/response-services', dashboardController.responseTimes)

  return dashboardRouter
}
