import { Router } from 'express'
import { TypesController } from '../controllers/typesController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { typesSchema, updateTypeSchema } from '../schemas/typesSchema.js'

export const createTypesRouter = ({ typesModel }) => {
  const typesRouter = Router()

  const typesController = new TypesController({ typesModel })

  typesRouter.post(
    '/create',
    validateSchema(typesSchema),
    typesController.create
  )
  typesRouter.patch(
    '/state/:id',
    validateSchema(updateTypeSchema),
    typesController.changeTypeStatus
  )
  typesRouter.delete('/delete/:id', typesController.deleteType)
  typesRouter.get('/', typesController.getTypes)

  return typesRouter
}
