import { StatesServicesService } from '../services/statesServicesService.js'

export class StatesServicesController {
  constructor({ statesServicesModel }) {
    this.statesServicesModel = new StatesServicesService({
      statesServicesModel,
    })
  }

  getStatesService = async (req, res) => {
    try {
      const statesServices = await this.statesServicesModel.getStatesService()

      res
        .status(200)
        .json({
          message: 'Estados del servicio obtenidos correctamente',
          statesServices,
        })
    } catch (error) {
      console.error(
        'Error en el controlador de obtener los estados del servicio:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
