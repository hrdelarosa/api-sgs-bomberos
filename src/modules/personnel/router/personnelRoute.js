import { Router } from 'express'
import { PersonnelController } from '../controllers/personnelController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import {
  personnelSchema,
  updatePersonnelSchema,
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
    '/update/:id',
    validateSchema(updatePersonnelSchema),
    personnelController.updatePersonnel
  )
  personnelRouter.delete('/delete/:id', personnelController.deletePersonnel)
  personnelRouter.get('/', personnelController.getPersonnel)
  personnelRouter.get('/rank/:id', personnelController.getPersonnelPerRank)
  personnelRouter.get('/guard/:id', personnelController.getPersonnelPerGuard)

  return personnelRouter
}
