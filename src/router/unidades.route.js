import { Router } from 'express'
import { UnidadesControllers } from '../controllers/unidades.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import {
  unidadesSchema,
  actuUnidadSchema,
  tipoSchema,
} from '../schemas/unidades.schema.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'
import { authRequired } from '../middleware/auth.js'

export const createUnidadesRouter = ({ unidadesModel }) => {
  const unidadesRouter = Router()

  const unidadesControllers = new UnidadesControllers({ unidadesModel })

  // --> Unidades
  unidadesRouter.post(
    '/crear',
    authRequired,
    isUsuAdmin,
    validateSchema(unidadesSchema),
    unidadesControllers.crearUnidad
  )
  unidadesRouter.patch(
    '/actualizar/:id',
    authRequired,
    isUsuAdmin,
    validateSchema(actuUnidadSchema),
    unidadesControllers.actualizarUnidad
  )
  unidadesRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    unidadesControllers.eliminarUnidad
  )
  unidadesRouter.get('/', authRequired, unidadesControllers.obtenerUnidades)

  // --> Tipos de unidad
  unidadesRouter.post(
    '/tipo/crear',
    authRequired,
    isUsuAdmin,
    validateSchema(tipoSchema),
    unidadesControllers.crearTipo
  )
  unidadesRouter.delete(
    '/tipo/eliminar/:id',
    authRequired,
    isUsuAdmin,
    unidadesControllers.eliminarTipo
  )
  unidadesRouter.get('/tipo', authRequired, unidadesControllers.obtenerTipos)

  return unidadesRouter
}
