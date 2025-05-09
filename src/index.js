import { createApp } from './app.js'
import { AuthModel } from './modules/auth/models/authModel.js'
import { RolesModel } from './modules/roles/models/rolesModel.js'
import { StatesModel } from './modules/states/models/statesModel.js'
import { UnitsModel } from './modules/units/models/unitsModel.js'
import { TypeModel } from './modules/units/models/typesModel.js'
import { PersonnelModel } from './modules/personnel/models/personnelModel.js'
import { GuardsModel } from './modules/guards/models/guardsModel.js'
import { RanksModel } from './modules/ranks/models/ranksModel.js'
import { UsersModel } from './modules/users/models/usersModel.js'
import { ServicesModel } from './modules/services/models/servicesModel.js'
import { StatesServicesModel } from './modules/services/models/statesServicesModel.js'
import { StationsModel } from './modules/stations/models/stationsModel.js'
import { DashboardModel } from './modules/dashboard/models/dashboardModel.js'

createApp({
  authModel: AuthModel,
  rolesModel: RolesModel,
  statesModel: StatesModel,
  unitsModel: UnitsModel,
  typesModel: TypeModel,
  personnelModel: PersonnelModel,
  guardsModel: GuardsModel,
  ranksModel: RanksModel,
  usersModel: UsersModel,
  servicesModel: ServicesModel,
  statesServicesModel: StatesServicesModel,
  stationsModel: StationsModel,
  dashboardModel: DashboardModel,
})
