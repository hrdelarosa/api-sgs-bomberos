import { Router } from 'express'
import { UsersController } from '../controllers/usersController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import {
  updateUserRoleSchema,
  updateUserStateSchema,
} from '../schemas/usersSchema.js'

export const createUsersRouter = ({ usersModel }) => {
  const usersRouter = Router()

  const usersController = new UsersController({ usersModel })

  usersRouter.patch(
    '/state/:id',
    validateSchema(updateUserStateSchema),
    usersController.changeUserState
  )
  usersRouter.patch(
    '/role/:id',
    validateSchema(updateUserRoleSchema),
    usersController.changeUserRole
  )
  usersRouter.delete('/delete/:id', usersController.deleteUser)
  usersRouter.get('/', usersController.getUsers)

  return usersRouter
}
