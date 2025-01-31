import { createApp } from './app.js'
import { AuthModel } from './models/auth.model.js'
import { EconomicosModel } from './models/economicos.model.js'
import { EstacionesModel } from './models/estaciones.model.js'
import { EstadosModel } from './models/estados.model.js'
import { GuardiasModel } from './models/guardias.model.js'
import { PersonalModel } from './models/personal.model.js'
import { RangosModel } from './models/rangos.model.js'
import { RolesModel } from './models/roles.model.js'
import { ServiciosModel } from './models/servicio/servicios.model.js'
import { UnidadesModel } from './models/unidades.model.js'
import { UsuariosModel } from './models/usuarios.model.js'
import { VacacionesModel } from './models/vacaciones.model.js'

createApp({
  rolesModel: RolesModel,
  estadosModel: EstadosModel,
  authModel: AuthModel,
  unidadesModel: UnidadesModel,
  guardiasModel: GuardiasModel,
  estacionesModel: EstacionesModel,
  personalModel: PersonalModel,
  rangosModel: RangosModel,
  economicosModel: EconomicosModel,
  vacacionesModel: VacacionesModel,
  usuariosModel: UsuariosModel,
  serviciosModel: ServiciosModel,
})
