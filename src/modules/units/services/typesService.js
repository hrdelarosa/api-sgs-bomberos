import customError from '../../../utils/customError.js'

export class TypesService {
  constructor({ typesModel }) {
    this.typesModel = typesModel
  }

  create = async ({ nombre }) => {
    try {
      const typeExists = await this.typesModel.findTypeByName({ nombre })
      console.log(typeExists)

      if (typeExists) customError('El tipo ya existe', 409)

      await this.typesModel.create({ nombre })
    } catch (error) {
      console.error('Error en el servicio de crear el tipo:', error)
      throw error
    }
  }

  changeTypeStatus = async ({ id, estado }) => {
    try {
      const typeExists = await this.typesModel.findTypeById({ id })

      if (typeExists === null) customError('El tipo no existe', 409)

      await this.typesModel.updateStatusById({ estado, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar el tipo:', error)
      throw error
    }
  }

  deleteType = async ({ id }) => {
    try {
      const typeExists = await this.typesModel.findTypeById({ id })

      if (typeExists === null) customError('El tipo no existe', 409)
      if (typeExists.est_id_tu === 'inactivo')
        customError('El tipo ya esta inactivo', 409)

      const countUnits = await this.typesModel.typeRelatedUnits({ id })

      if (countUnits > 0)
        customError(
          'No se puede eliminar el tipo porque tiene unidades relacionadas',
          409
        )

      await this.typesModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar el tipo:', error)
      throw error
    }
  }

  getTypes = async () => {
    try {
      const types = await this.typesModel.getTypes()

      if (types.length === 0) customError('Tipos no encontrados', 404)

      return types
    } catch (error) {
      console.error('Error en el servicio de obtener los tipos:', error)
      throw error
    }
  }
}
