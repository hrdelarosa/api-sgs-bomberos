import { Router } from 'express'
import { StatesServicesController } from '../controllers/statesServicesController.js'

export const createStatesServicesRouter = ({ statesServicesModel }) => {
  const statesServicesRouter = Router()

  const statesServicesController = new StatesServicesController({
    statesServicesModel,
  })

  statesServicesRouter.get('/', statesServicesController.getStatesService)

  return statesServicesRouter
}
