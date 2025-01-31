import { Router } from 'express'
import { PersonalController } from '../controllers/personal.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { personalSchema } from '../schemas/personal.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createPersonalRouter = ({ personalModel }) => {
  const personalRouter = Router()

  const personalController = new PersonalController({ personalModel })

  personalRouter.post(
    '/crear',
    validateSchema(personalSchema),
    authRequired,
    isUsuAdmin,
    personalController.crearPersonal
  )
  personalRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    personalController.eliminarPersonal
  )
  personalRouter.get('/', authRequired, personalController.obtenerPersonal)
  personalRouter.get(
    '/:guard',
    authRequired,
    personalController.obtenerPorGuardia
  )
  personalRouter.get(
    '/excluir/:guard',
    authRequired,
    personalController.evitarPorGuardia
  )
  personalRouter.patch(
    '/actualizar/guardia/:id',
    authRequired,
    isUsuAdmin,
    personalController.actualizarGuardPers
  )

  return personalRouter
}
