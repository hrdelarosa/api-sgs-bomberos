import { Router } from 'express'
import { StationsController } from '../controllers/stationsController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import {
  stationsSchema,
  stationsUpdateSchema,
} from '../schemas/stationsSchema.js'

export const createStationsRouter = ({ stationsModel }) => {
  const stationsRouter = Router()

  const stationsController = new StationsController({ stationsModel })

  stationsRouter.post(
    '/create',
    validateSchema(stationsSchema),
    stationsController.create
  )
  stationsRouter.patch(
    '/state/:id',
    validateSchema(stationsUpdateSchema),
    stationsController.changeStationStatus
  )
  stationsRouter.delete('/delete/:id', stationsController.deleteStation)
  stationsRouter.get('/', stationsController.getStations)

  return stationsRouter
}
