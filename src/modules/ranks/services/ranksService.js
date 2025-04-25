import customError from '../../../utils/customError.js'

export class RanksService {
  constructor({ ranksModel }) {
    this.ranksModel = ranksModel
  }

  create = async ({ nombre }) => {
    try {
      const rankExists = await this.ranksModel.findRankByName({ nombre })

      if (rankExists) customError('El rango ya existe', 409)

      await this.ranksModel.create({ nombre })
    } catch (error) {
      console.error('Error en el servicio de crear un rango:', error)
      throw error
    }
  }

  changeRankStatus = async ({ id, estado }) => {
    try {
      const rankExists = await this.ranksModel.findRankById({ id })

      if (rankExists === null) customError('El rango no existe', 404)

      await this.ranksModel.updateStateById({ estado, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar el rango:', error)
      throw error
    }
  }

  // NOTA: Agregar relacion de rango con el personal, para no permitir eliminar un rango que tenga personal relacionado
  deleteRank = async ({ id }) => {
    try {
      const rankExists = await this.ranksModel.findRankById({ id })

      if (rankExists === null) customError('El rango no existe', 404)
      if (rankExists.est_nombre === 'inactivo')
        customError('El rango ya esta inactivo', 409)

      const countPersonnel = await this.ranksModel.ranksRelatedPersonnel({ id })

      if (countPersonnel > 0)
        customError(
          'No se puede eliminar el rango porque tiene personal relacionado',
          409
        )

      await this.ranksModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar la unidad:', error)
      throw error
    }
  }

  getRanks = async () => {
    try {
      const ranks = await this.ranksModel.getRanks()

      if (ranks.length === 0) customError('Rangos no encontrados', 404)

      return ranks
    } catch (error) {
      console.error('Error en el servicio de obtener los rangos:', error)
      throw error
    }
  }
}
