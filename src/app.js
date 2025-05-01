import './lib/loadEnv.js'
import './utils/cronJobs.js'
import express, { json } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { corsMiddleware } from './middleware/cors.js'
import cookieParser from 'cookie-parser'
import https from 'https'

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
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  // Configuración SSL
  const options = {
    key: fs.readFileSync(path.join(__dirname, '../certificates/private.key')),
    cert: fs.readFileSync(
      path.join(__dirname, '../certificates/certificate.pem')
    ),
  }

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

  const PORT = process.env.PORT || 3000

  // Crear servidor HTTPS
  const server = https.createServer(options, app)

  server.listen(PORT, () => {
    console.log(`Servidor HTTPS escuchando en puerto https://localhost:${PORT}`)
  })
}
