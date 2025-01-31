import { Router } from 'express'
import { EstacionesController } from '../controllers/estaciones.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { estacionesSchema } from '../schemas/estaciones.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createEstacionesRouter = ({ estacionesModel }) => {
  const estacionesRouter = Router()

  const estacionesController = new EstacionesController({ estacionesModel })

  estacionesRouter.post(
    '/crear',
    authRequired,
    isUsuAdmin,
    validateSchema(estacionesSchema),
    estacionesController.crearEstacion
  )
  estacionesRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    estacionesController.eliminarEstacion
  )
  estacionesRouter.get(
    '/',
    authRequired,
    isUsuAdmin,
    estacionesController.obtenerEstaciones
  )
  estacionesRouter.get(
    '/:nombre',
    authRequired,
    isUsuAdmin,
    estacionesController.obtenerEstacionPorNom
  )

  return estacionesRouter
}
