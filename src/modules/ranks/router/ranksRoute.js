import { Router } from 'express'
import { RanksController } from '../controllers/ranksController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { ranksSchema, updateStateSchema } from '../schemas/ranksSchema.js'

export const createRanksRouter = ({ ranksModel }) => {
  const ranksRouter = Router()

  const ranksController = new RanksController({ ranksModel })

  ranksRouter.post(
    '/create',
    validateSchema(ranksSchema),
    ranksController.create
  )
  ranksRouter.patch(
    '/state/:id',
    validateSchema(updateStateSchema),
    ranksController.changeRankStatus
  )
  ranksRouter.delete('/delete/:id', ranksController.deleteRank)
  ranksRouter.get('/', ranksController.getRanks)

  return ranksRouter
}
