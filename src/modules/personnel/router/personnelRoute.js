import { Router } from 'express'
import { PersonnelController } from '../controllers/personnelController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import {
  personnelSchema,
  updateGuardSchema,
  updateRankSchema,
  updateStateSchema,
} from '../schemas/personnelSchema.js'

export const createPersonnelRouter = ({ personnelModel }) => {
  const personnelRouter = Router()

  const personnelController = new PersonnelController({ personnelModel })

  personnelRouter.post(
    '/create',
    validateSchema(personnelSchema),
    personnelController.create
  )
  personnelRouter.patch(
    '/state/:id',
    validateSchema(updateStateSchema),
    personnelController.changePersonnelStatus
  )
  personnelRouter.delete('/delete/:id', personnelController.deletePersonnel)
  personnelRouter.get('/', personnelController.getPersonnel)
  personnelRouter.get('/rank/:id', personnelController.getPersonnelPerRank)
  personnelRouter.get('/guard/:id', personnelController.getPersonnelPerGuard)
  personnelRouter.patch(
    '/rank/:id',
    validateSchema(updateRankSchema),
    personnelController.changePersonnelRank
  )
  personnelRouter.patch(
    '/guard/:id',
    validateSchema(updateGuardSchema),
    personnelController.changePersonnelGuard
  )
  // personnelRouter.get('/:guard', personnelController.obtenerPorGuardia)
  // personnelRouter.get('/excluir/:guard', personnelController.evitarPorGuardia)

  return personnelRouter
}
