import customError from '../../../utils/customError.js'

export class GuardsService {
  constructor({ guardsModel }) {
    this.guardsModel = guardsModel
  }

  //NOTA: Posible modaificación para que pueda haber mas de guardia con el mismo nombre
  create = async ({ nombre, estacion }) => {
    try {
      const guardExist = await this.guardsModel.findGuardByName({ nombre })

      if (guardExist) customError('La guardia ya existe', 409)

      await this.guardsModel.create({ nombre, estacion })
    } catch (error) {
      console.error('Error en el servicio de crear la guardia:', error)
      throw error
    }
  }

  deleteGuard = async ({ id }) => {
    try {
      const guardExist = await this.guardsModel.findGuardById({ id })

      if (guardExist === null) customError('La guardia no existe', 409)

      const countPersonnel = await this.guardsModel.guardsRelatedPersonnel({
        id,
      })

      if (countPersonnel > 0)
        customError(
          'No se puede eliminar la guardia porque tiene personal relacionado',
          409
        )

      await this.guardsModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar la guardia:', error)
      throw error
    }
  }

  getGuards = async () => {
    try {
      const guards = await this.guardsModel.getGuards()

      if (guards.length === 0) customError('Guardias no encontradas', 404)

      return guards
    } catch (error) {
      console.error('Error en el servicio de obtener las guardias:', error)
      throw error
    }
  }

  getGuardsPerStations = async ({ id }) => {
    try {
      const guards = await this.guardsModel.getGuardsPerStations({ id })

      if (guards.length === 0) customError('Guardias no encontradas', 404)

      return guards
    } catch (error) {
      console.error(
        'Error en el servicio de obtener las guardias por estación:',
        error
      )
      throw error
    }
  }
}
