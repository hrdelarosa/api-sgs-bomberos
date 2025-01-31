import { Router } from 'express'
import { RangosController } from '../controllers/rangos.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { rangosSchema } from '../schemas/rangos.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createRangosRouter = ({ rangosModel }) => {
  const rangosRouter = Router()

  const rangosController = new RangosController({ rangosModel })

  rangosRouter.post(
    '/crear',
    authRequired,
    isUsuAdmin,
    validateSchema(rangosSchema),
    rangosController.crearRango
  )
  rangosRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    rangosController.eliminarRango
  )
  rangosRouter.get('/', authRequired, rangosController.obtnerRangos)

  return rangosRouter
}
