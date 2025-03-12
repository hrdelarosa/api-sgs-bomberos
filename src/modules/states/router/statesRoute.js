import { Router } from 'express'
import { StatesController } from '../controllers/statesController.js'

export const createStatesRouter = ({ statesModel }) => {
  const statesRouter = Router()

  const statesController = new StatesController({ statesModel })

  statesRouter.get('/', statesController.getStates)

  return statesRouter
}
