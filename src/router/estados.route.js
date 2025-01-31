import { Router } from 'express'
import { EstadosController } from '../controllers/estados.controller.js'
import { authRequired } from '../middleware/auth.js'

export const createEstadosRouter = ({ estadosModel }) => {
  const estadosRouter = Router()

  const estadosController = new EstadosController({ estadosModel })

  estadosRouter.get('/', authRequired, estadosController.obtenerEstados)
  estadosRouter.get(
    '/id/:id',
    authRequired,
    estadosController.obtenerEstadoPorId
  )
  estadosRouter.get(
    '/:nombre',
    authRequired,
    estadosController.obtenerEstadoPorNombre
  )

  return estadosRouter
}
