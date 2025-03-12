import { Router } from 'express'
import { GuardsController } from '../controllers/guardsController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { guardsSchema } from '../schemas/guardsSchema.js'

export const createGuardsRouter = ({ guardsModel }) => {
  const guardsRouter = Router()

  const guardsController = new GuardsController({ guardsModel })

  guardsRouter.post(
    '/crear',
    validateSchema(guardsSchema),
    guardsController.create
  )
  guardsRouter.delete('/eliminar/:id', guardsController.deleteGuard)
  guardsRouter.get('/', guardsController.getGuards)
  guardsRouter.get('/:id', guardsController.getGuardsPerStations)

  return guardsRouter
}
