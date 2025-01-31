import express, { json } from 'express'
import './lib/loadEnv.js'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middleware/cors.js'
import { createRolesRouter } from './router/roles.route.js'
import { createEstadosRouter } from './router/estados.route.js'
import { createAuthRouter } from './router/auth.route.js'
import { createUnidadesRouter } from './router/unidades.route.js'
import { createGuardiasRouter } from './router/guardias.route.js'
import { createEstacionesRouter } from './router/estaciones.router.js'
import { createPersonalRouter } from './router/personal.route.js'
import { createRangosRouter } from './router/rangos.route.js'
import { createEconomicosRouter } from './router/economicos.route.js'
import { createVacacionesRouter } from './router/vacaciones.route.js'
import { createUsuariosRouter } from './router/usuarios.route.js'
import { createServiciosRouter } from './router/servicios.route.js'

export const createApp = ({
  rolesModel,
  estadosModel,
  authModel,
  unidadesModel,
  guardiasModel,
  estacionesModel,
  personalModel,
  rangosModel,
  economicosModel,
  vacacionesModel,
  usuariosModel,
  serviciosModel,
}) => {
  const app = express()

  app.use(json())
  app.use(corsMiddleware())
  app.use(cookieParser())
  app.disable('x-powered-by')

  app.use('/api/roles', createRolesRouter({ rolesModel }))
  app.use('/api/estados', createEstadosRouter({ estadosModel }))
  app.use('/api/auth', createAuthRouter({ authModel }))
  app.use('/api/unidades', createUnidadesRouter({ unidadesModel }))
  app.use('/api/guardias', createGuardiasRouter({ guardiasModel }))
  app.use('/api/estaciones', createEstacionesRouter({ estacionesModel }))
  app.use('/api/personal', createPersonalRouter({ personalModel }))
  app.use('/api/rangos', createRangosRouter({ rangosModel }))
  app.use('/api/dias', createEconomicosRouter({ economicosModel }))
  app.use('/api/vacaciones', createVacacionesRouter({ vacacionesModel }))
  app.use('/api/usuarios', createUsuariosRouter({ usuariosModel }))
  app.use('/api/servicios', createServiciosRouter({ serviciosModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
