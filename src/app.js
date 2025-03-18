import './lib/loadEnv.js'
import './utils/cronJobs.js'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middleware/cors.js'

import { createAuthRouter } from './modules/auth/routes/authRoute.js'
import { createRolesRouter } from './modules/roles/router/rolesRoute.js'
import { createStatesRouter } from './modules/states/router/statesRoute.js'
import { createUnitsRouter } from './modules/units/router/unitsRoute.js'
import { createTypesRouter } from './modules/units/router/typesRoute.js'
import { createPersonnelRouter } from './modules/personnel/router/personnelRoute.js'
import { createGuardsRouter } from './modules/guards/router/guardsRoute.js'
import { createRanksRouter } from './modules/ranks/router/ranksRoute.js'
import { createUsersRouter } from './modules/users/router/usersRoute.js'
import { createServicesRouter } from './modules/services/router/servicesRoute.js'
import { createStatesServicesRouter } from './modules/services/router/statesServicesRoute.js'
import { createStationsRouter } from './modules/stations/router/stationsRoute.js'

export const createApp = ({
  authModel,
  rolesModel,
  statesModel,
  unitsModel,
  typesModel,
  personnelModel,
  guardsModel,
  ranksModel,
  usersModel,
  servicesModel,
  statesServicesModel,
  stationsModel,
}) => {
  const app = express()

  app.use(json())
  app.use(corsMiddleware())
  app.use(cookieParser())
  app.disable('x-powered-by')

  app.use('/api/auth', createAuthRouter({ authModel }))
  app.use('/api/roles', createRolesRouter({ rolesModel }))
  app.use('/api/states', createStatesRouter({ statesModel }))
  app.use('/api/units', createUnitsRouter({ unitsModel }))
  app.use('/api/types', createTypesRouter({ typesModel }))
  app.use('/api/personnel', createPersonnelRouter({ personnelModel }))
  app.use('/api/guards', createGuardsRouter({ guardsModel }))
  app.use('/api/ranks', createRanksRouter({ ranksModel }))
  app.use('/api/users', createUsersRouter({ usersModel }))
  app.use('/api/services', createServicesRouter({ servicesModel }))
  app.use(
    '/api/states/services',
    createStatesServicesRouter({ statesServicesModel })
  )
  app.use('/api/stations', createStationsRouter({ stationsModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
