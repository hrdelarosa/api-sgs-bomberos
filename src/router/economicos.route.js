import { Router } from 'express'
import { EconomicosController } from '../controllers/economicos.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { economicosSchema } from '../schemas/economicos.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createEconomicosRouter = ({ economicosModel }) => {
  const economicosRouter = Router()

  const economicosController = new EconomicosController({ economicosModel })

  economicosRouter.post(
    '/crear',
    authRequired,
    validateSchema(economicosSchema),
    economicosController.crearDiaEconomico
  )
  economicosRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    economicosController.eliminarDiaEconomico
  )
  economicosRouter.get(
    '/',
    authRequired,
    economicosController.obtenerDiasEconomicos
  )

  return economicosRouter
}
