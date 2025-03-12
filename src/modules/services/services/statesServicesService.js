import customError from '../../../utils/customError.js'

export class StatesServicesService {
  constructor({ statesServicesModel }) {
    this.statesServicesModel = statesServicesModel
  }

  getStatesService = async () => {
    try {
      const states = await this.statesServicesModel.getStatesService()

      if (states.length === 0) customError('Roles no encontrados', 404)

      return states
    } catch (error) {
      console.error(
        'Error en el servicio de obtener los estados del servicio:',
        error
      )
      throw error
    }
  }
}
