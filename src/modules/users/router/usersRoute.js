import { Router } from 'express'
import { UsersController } from '../controllers/usersController.js'
import { validateSchema } from '../../../middleware/validateSchema.js'
import { updateUserSchema } from '../schemas/usersSchema.js'

export const createUsersRouter = ({ usersModel }) => {
  const usersRouter = Router()

  const usersController = new UsersController({ usersModel })

  usersRouter.patch(
    '/update/:id',
    validateSchema(updateUserSchema),
    usersController.updateUser
  )
  usersRouter.delete('/delete/:id', usersController.deleteUser)
  usersRouter.get('/', usersController.getUsers)
  usersRouter.get('/:id', usersController.getUserById)

  return usersRouter
}
