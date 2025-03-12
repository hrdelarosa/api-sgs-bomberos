import { Router } from 'express'
import { ServicesController } from '../controllers/servicesController.js'

export const createServicesRouter = ({ servicesModel }) => {
  const servicesRouter = Router()

  const servicesController = new ServicesController({ servicesModel })

  servicesRouter.post('/create', servicesController.create)
  servicesRouter.delete('/delete/:id', servicesController.deleteService)
  servicesRouter.get('/', servicesController.getServices)
  servicesRouter.get('/:id', servicesController.getServiceId)
  servicesRouter.get('/creator/:id', servicesController.getServiceByCreator)

  return servicesRouter
}
