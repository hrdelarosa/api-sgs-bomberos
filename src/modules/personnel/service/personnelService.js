import customError from '../../../utils/customError.js'

export class PersonnelService {
  constructor({ personnelModel }) {
    this.personnelModel = personnelModel
  }

  create = async ({ nombre, apellidos, np, rango, base, guardia }) => {
    try {
      const personnelExists = await this.personnelModel.findPersonnelByNp({
        np,
      })

      if (personnelExists) customError('El personal ya existe', 409)

      await this.personnelModel.create({
        nombre,
        apellidos,
        np,
        rango,
        base,
        guardia,
      })
    } catch (error) {
      console.error('Error en el servicio de crear el personal:', error)
      throw error
    }
  }

  changePersonnelStatus = async ({ id, estado }) => {
    try {
      const personnelExists = await this.personnelModel.findPersonnelById({
        id,
      })

      if (personnelExists === null) customError('El personal no existe', 409)

      await this.personnelModel.updateStatusById({ estado, id })
    } catch (error) {
      console.error(
        'Error en el servicio de actualizar el estado del personal:',
        error
      )
      throw error
    }
  }

  deletePersonnel = async ({ id }) => {
    try {
      const personnelExists = await this.personnelModel.findPersonnelById({
        id,
      })

      if (personnelExists === null) customError('El personal no existe', 409)
      if (personnelExists.est_id_per === 'inactivo')
        customError('El personal ya esta inactivo', 409)

      const countServices = await this.personnelModel.personnelRelatedService({
        id,
      })

      if (countServices > 0)
        customError(
          'No se puede eliminar el personal porque tiene servicios relacionados',
          409
        )

      await this.personnelModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar el personal:', error)
      throw error
    }
  }

  getPersonnel = async () => {
    try {
      const personnel = await this.personnelModel.getPersonnel()

      if (personnel.length === 0) customError('Personal no encontrado', 404)

      return personnel
    } catch (error) {
      console.error('Error en el servicio de obtener el personal:', error)
      throw error
    }
  }

  getPersonnelPerRank = async ({ id }) => {
    try {
      const personnel = await this.personnelModel.getPersonnelPerRank({ id })

      if (personnel.length === 0) customError('Personal no encontrado', 404)

      return personnel
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el personal por rango:',
        error
      )
      throw error
    }
  }

  getPersonnelPerGuard = async ({ id }) => {
    try {
      const personnel = await this.personnelModel.getPersonnelPerGuard({ id })

      if (personnel.length === 0) customError('Personal no encontrado', 404)

      return personnel
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el personal por guardia:',
        error
      )
      throw error
    }
  }

  changePersonnelRank = async ({ id, rango }) => {
    try {
      const personnelExists = await this.personnelModel.findPersonnelById({
        id,
      })

      if (personnelExists === null) customError('El personal no existe', 409)

      await this.personnelModel.updateRankById({ rango, id })
    } catch (error) {
      console.error(
        'Error en el servicio de actualizar el rango del personal:',
        error
      )
      throw error
    }
  }

  changePersonnelGuard = async ({ id, guardia }) => {
    try {
      const personnelExists = await this.personnelModel.findPersonnelById({
        id,
      })

      if (personnelExists === null) customError('El personal no existe', 409)

      await this.personnelModel.updateGuardById({ guardia, id })
    } catch (error) {
      console.error(
        'Error en el servicio de actualizar la guardia del personal:',
        error
      )
      throw error
    }
  }
}
