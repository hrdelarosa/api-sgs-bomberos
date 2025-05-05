import dayjs from 'dayjs'
import createFolio from '../../../utils/createFolio.js'
import customError from '../../../utils/customError.js'

export class ServicesService {
  constructor({ servicesModel }) {
    this.servicesModel = servicesModel
  }

  createService = async ({
    usuario,
    nombre,
    telefono,
    salida,
    llegada,
    control,
    base,
    incidente,
    ubicacion,
    otro,
    observaciones,
    personal,
    unidades,
    incendio,
    fugaDerrame,
    abejas,
    rescate,
    daños,
    legales,
  }) => {
    const date = dayjs().format('YYYYMMDD')

    try {
      const folio = await createFolio({ date })
      const id = await this.servicesModel.create({
        usuario,
        nombre,
        telefono,
        salida,
        llegada,
        control,
        base,
        incidente,
        ubicacion,
        folio,
        otro,
        observaciones,
      })

      if (personal && Array.isArray(personal) && personal.length > 0) {
        for (const persona of personal) {
          await this.servicesModel.insertServicePersonnel({ id, persona })
        }
      }
      if (unidades && Array.isArray(unidades) && unidades.length > 0) {
        for (const unidad of unidades) {
          await this.servicesModel.insertServiceUnits({ id, unidad })
        }
      }
      if (incendio && Object.keys(incendio).some((key) => incendio[key] !== ''))
        await this.servicesModel.insertFireInsidente({ incendio, id })
      if (
        fugaDerrame &&
        Object.keys(fugaDerrame).some((key) => fugaDerrame[key] !== '')
      )
        await this.servicesModel.insertLeakageInsidente({ fugaDerrame, id })
      if (abejas && Object.keys(abejas).some((key) => abejas[key] !== ''))
        await this.servicesModel.insertBeesInsidente({ abejas, id })
      if (rescate && Object.keys(rescate).some((key) => rescate[key] !== ''))
        await this.servicesModel.insertRescueInsidente({ rescate, id })
      if (daños && Object.keys(daños).some((key) => daños[key] !== ''))
        await this.servicesModel.insertDamageInsidente({ daños, id })
      if (legales && Object.keys(legales).some((key) => legales[key] !== ''))
        await this.servicesModel.insertLegalInsidente({ legales, id })
    } catch (error) {
      console.error('Error en el servicio de crear el servicio:', error)
      throw error
    }
  }

  changeServiceStatus = async ({ id, estado }) => {
    try {
      const serviceExists = await this.servicesModel.findServiceById({ id })

      if (serviceExists === null) customError('El servicio no existe', 404)

      if (serviceExists.estser_nombre === 'archivado')
        customError('El servicio ya esta archivado', 409)

      await this.servicesModel.updateStatusById({ estado, id })
    } catch (error) {
      console.error('Error en el servicio de actualizar el servicio:', error)
      throw error
    }
  }

  deleteService = async ({ id }) => {
    try {
      const serviceExists = await this.servicesModel.findServiceById({ id })

      if (serviceExists === null) customError('El servicio no existe', 404)

      if (serviceExists.estser_nombre !== 'archivado')
        customError(
          'El servicio solo puede ser eliminado cuando está archivado',
          422
        )

      await this.servicesModel.delete({ id })
    } catch (error) {
      console.error('Error en el servicio de eliminar el servicio:', error)
      throw error
    }
  }

  getServices = async ({ page, folio, incidente }) => {
    try {
      if (page < 1)
        customError('El número de página no puede ser menor a 1', 422)

      const limit = 20
      const offset = (page - 1) * limit
      const totalServices = await this.servicesModel.getTotalServices({
        folio,
        incidente,
      })
      const totalPages = Math.ceil(totalServices / limit)
      const servicesPerPage = limit

      if (totalPages === 0) customError('Servicios no encontrados', 404)

      const services = await this.servicesModel.getServices({
        limit,
        offset,
        folio,
        incidente,
      })

      if (services.length === 0) customError('Servicios no encontrados', 404)

      return { totalPages, totalServices, servicesPerPage, services }
    } catch (error) {
      console.error('Error en el servicio de obtener los servicios:', error)
      throw error
    }
  }

  getServiceId = async ({ id }) => {
    try {
      const service = await this.servicesModel.getServiceById({ id })

      if (service === null) customError('El servicio no existe', 404)

      return service
    } catch (error) {
      console.error(
        'Error en el servicio de obtener el servicio por el id:',
        error
      )
      throw error
    }
  }

  getServiceByCreator = async ({ id, limit }) => {
    try {
      if (limit === undefined) limit = 3
      else limit = parseInt(limit)

      const services = await this.servicesModel.getServiceByCreator({
        id,
        limit,
      })

      if (services.length === 0)
        customError('El usuario aun no tiene servicios creados')

      return services
    } catch (error) {
      console.error(
        'Error en el servicio de obtener los servicio por creador:',
        error
      )
      throw error
    }
  }
}
