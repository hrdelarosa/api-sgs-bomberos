import { Router } from 'express'
import { validateSchema } from '../middleware/validateSchema.js'
import { rolesSchema } from '../schemas/roles.schema.js'
import { RolesController } from '../controllers/roles.controller.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createRolesRouter = ({ rolesModel }) => {
  const rolesRouter = Router()

  const rolesController = new RolesController({ rolesModel })

  rolesRouter.post(
    '/crear',
    authRequired,
    isUsuAdmin,
    validateSchema(rolesSchema),
    rolesController.crearRole
  )
  rolesRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    rolesController.eliminarRole
  )
  rolesRouter.get('/', authRequired, isUsuAdmin, rolesController.obtenerRoles)

  return rolesRouter
}
