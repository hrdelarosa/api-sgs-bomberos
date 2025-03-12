import { StatesService } from '../service/statesService.js'

export class StatesController {
  constructor({ statesModel }) {
    this.statesModel = new StatesService({ statesModel })
  }

  getStates = async (req, res) => {
    try {
      const states = await this.statesModel.getStates()

      res
        .status(200)
        .json({ message: 'Estados obtenidos correctamente', states })
    } catch (error) {
      console.error('Error en el controlador de obtener los estados:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
