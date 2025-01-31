import { Router } from 'express'
import { ServiciosController } from '../controllers/servicios.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { servicioSchema } from '../schemas/servicios.schema.js'
import { authRequired } from '../middleware/auth.js'

export const createServiciosRouter = ({ serviciosModel }) => {
  const serviciosRouter = Router()

  const serviciosController = new ServiciosController({ serviciosModel })

  serviciosRouter.post(
    '/crear',
    authRequired,
    validateSchema(servicioSchema),
    serviciosController.crearServicio
  )
  serviciosRouter.delete(
    '/eliminar/:id',
    authRequired,
    serviciosController.eliminarServicio
  )
  serviciosRouter.get('/', authRequired, serviciosController.obtenerServicios)
  serviciosRouter.get(
    '/:id',
    authRequired,
    serviciosController.obtenerServicioPorId
  )
  serviciosRouter.get(
    '/creado/:id',
    authRequired,
    serviciosController.obtenerServicioPorCreador
  )

  return serviciosRouter
}
