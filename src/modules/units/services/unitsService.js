import customError from '../../../utils/customError.js'

export class UnitsService {
  constructor({ unitsModel }) {
    this.unitsModel = unitsModel
  }

  create = async ({ tipo, numero }) => {
    try {
      const unitExists = await this.unitsModel.findUnitByNumber({ numero })

      if (unitExists) customError('La unidad ya existe', 409)

      await this.unitsModel.create({ tipo, numero })
    } catch (error) {
      console.error('Error en el servicio de crear una unidad:', error)
      throw error
    }
  }

  changeUnitStatus = async ({ id, estado }) => {
    try {
      const unitExists = await this.unitsModel.findUnitByid({ id })

      if (unitExists === null) customError('La unidad no existe', 409)

      await this.unitsModel.updateStatusById({ estado, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar la unidad:', error)
      throw error
    }
  }

  deleteUnit = async ({ id }) => {
    try {
      const unitExists = await this.unitsModel.findUnitByid({ id })

      if (unitExists === null) customError('La unidad no existe', 409)
      if (unitExists.est_id_uni === 'inactivo')
        customError('La unidad ya esta inactiva', 409)

      const countServices = await this.unitsModel.unitsRelatedService({ id })

      if (countServices > 0)
        customError(
          'No se puede eliminar la unidad porque tiene servicios relacionados',
          409
        )

      await this.unitsModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar la unidad:', error)
      throw error
    }
  }

  getUnits = async () => {
    try {
      const units = await this.unitsModel.getUnits()

      if (units.length === 0) customError('Unidades no encontradas', 404)

      return units
    } catch (error) {
      console.error('Error en el servicio de obtener las unidades:', error)
      throw error
    }
  }
}
