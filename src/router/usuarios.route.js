import { Router } from 'express'
import { UsuariosController } from '../controllers/usuarios.controller.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { usuariosSchema } from '../schemas/usuarios.schema.js'
import { authRequired } from '../middleware/auth.js'
import { isUsuAdmin } from '../middleware/isAdmin.js'

export const createUsuariosRouter = ({ usuariosModel }) => {
  const usuariosRouter = Router()

  const usuariosController = new UsuariosController({ usuariosModel })

  usuariosRouter.patch(
    '/actualizar/:id',
    authRequired,
    isUsuAdmin,
    validateSchema(usuariosSchema),
    usuariosController.actualizarUsuario
  )
  usuariosRouter.delete(
    '/eliminar/:id',
    authRequired,
    isUsuAdmin,
    usuariosController.eliminarUsuario
  )
  usuariosRouter.get(
    '/',
    authRequired,
    isUsuAdmin,
    usuariosController.obtenerUsuarios
  )

  return usuariosRouter
}
