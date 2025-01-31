import { Router } from 'express'
import { GuardiasController } from '../controllers/guardias.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { guardiasSchema } from '../schemas/guardias.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createGuardiasRouter = ({ guardiasModel }) => {
  const guardiasRouter = Router()

  const guardiasController = new GuardiasController({ guardiasModel })

  guardiasRouter.post(
    '/crear',
    authRequired,
    isUsuAdmin,
    validateSchema(guardiasSchema),
    guardiasController.crearGuardia
  )
  guardiasRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    guardiasController.eliminarGuardia
  )
  guardiasRouter.get('/', authRequired, guardiasController.obtenerGuardias)

  return guardiasRouter
}
