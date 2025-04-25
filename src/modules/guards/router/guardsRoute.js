import { Router } from 'express'
import { GuardsController } from '../controllers/guardsController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { guardsSchema } from '../schemas/guardsSchema.js'

export const createGuardsRouter = ({ guardsModel }) => {
  const guardsRouter = Router()

  const guardsController = new GuardsController({ guardsModel })

  guardsRouter.post(
    '/create',
    validateSchema(guardsSchema),
    guardsController.create
  )
  guardsRouter.delete('/delete/:id', guardsController.deleteGuard)
  guardsRouter.get('/', guardsController.getGuards)
  guardsRouter.get('/station/:id', guardsController.getGuardsPerStations)

  return guardsRouter
}
