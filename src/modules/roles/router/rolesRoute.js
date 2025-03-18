import { Router } from 'express'
import { RolesController } from '../controllers/rolesController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { rolesSchema, rolesUpdateSchema } from '../schemas/rolesSchema.js'

export const createRolesRouter = ({ rolesModel }) => {
  const rolesRouter = Router()

  const rolesController = new RolesController({ rolesModel })

  rolesRouter.post(
    '/crear',
    validateSchema(rolesSchema),
    rolesController.create
  )
  rolesRouter.patch(
    '/state/:id',
    validateSchema(rolesUpdateSchema),
    rolesController.changeRoleStatus
  )
  rolesRouter.delete('/delete/:id', rolesController.deleteRole)
  rolesRouter.get('/', rolesController.getRoles)

  return rolesRouter
}
