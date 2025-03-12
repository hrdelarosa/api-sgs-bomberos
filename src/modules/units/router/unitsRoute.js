import { Router } from 'express'
import { UnitsContoller } from '../controllers/unitsController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { unitsSchema, updateUnitSchema } from '../schemas/unitsSchema.js'

export const createUnitsRouter = ({ unitsModel }) => {
  const unitsRouter = Router()

  const unitsController = new UnitsContoller({ unitsModel })

  unitsRouter.post(
    '/create',
    validateSchema(unitsSchema),
    unitsController.create
  )
  unitsRouter.patch(
    '/state/:id',
    validateSchema(updateUnitSchema),
    unitsController.changeUnitStatus
  )
  unitsRouter.delete('delete/:id', unitsController.deleteUnit)
  unitsRouter.get('/', unitsController.getUnits)

  return unitsRouter
}
