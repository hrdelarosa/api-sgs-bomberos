import customError from '../../../utils/customError.js'

export class StatesService {
  constructor({ statesModel }) {
    this.statesModel = statesModel
  }

  getStates = async () => {
    try {
      const states = await this.statesModel.getStates()

      if (states.length === 0) customError('Roles no encontrados', 404)

      return states
    } catch (error) {
      console.error('Error en el servicio de obtener los estados:', error)
      throw error
    }
  }
}
