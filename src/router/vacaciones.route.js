import { Router } from 'express'
import { VacacionesController } from '../controllers/vacaciones.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { vacacionesSchema } from '../schemas/vacaciones.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createVacacionesRouter = ({ vacacionesModel }) => {
  const vacacionesRouter = Router()

  const vacacionesController = new VacacionesController({ vacacionesModel })

  vacacionesRouter.post(
    '/crear',
    authRequired,
    validateSchema(vacacionesSchema),
    vacacionesController.crearVacaciones
  )
  vacacionesRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    vacacionesController.eliminarVacaciones
  )
  vacacionesRouter.get(
    '/',
    authRequired,
    vacacionesController.obtenerVacaciones
  )

  return vacacionesRouter
}
