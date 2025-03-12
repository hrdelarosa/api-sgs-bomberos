import { ServicesService } from '../services/servicesService.js'

export class ServicesController {
  constructor({ servicesModel }) {
    this.servicesService = new ServicesService({ servicesModel })
  }

  create = async (req, res) => {
    try {
      const {
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
      } = req.body

      await this.servicesService.createService({
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
      })

      res.status(201).json({ message: 'Servicio creado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear un servicio:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteService = async (req, res) => {
    try {
      const { id } = req.params

      await this.servicesService.deleteService({ id })

      res.status(200).json({ message: 'Servicio eliminado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar el servicio:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getServices = async (req, res) => {
    try {
      let { page = 1 } = req.query

      const { totalPages, totalServices, servicesPerPage, services } =
        await this.servicesService.getServices({
          page,
        })

      res.status(200).json({
        message: 'Servicios obtenidos correctamente',
        totalPages,
        totalServices,
        servicesPerPage,
        services,
      })
    } catch (error) {
      console.error('Error en el controlador de obtener los servicios:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getServiceId = async (req, res) => {
    try {
      const { id } = req.params

      const service = await this.servicesService.getServiceId({ id })

      res
        .status(200)
        .json({ message: 'Servicios obtenidos correctamente', service })
    } catch (error) {
      console.error('Error en el controlador de obtener el servicio:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getServiceByCreator = async (req, res) => {
    try {
      const { id } = req.params
      let { limit } = req.query

      const services = await this.servicesService.getServiceByCreator({
        id,
        limit,
      })

      res.status(200).json({
        message: 'Servicios del usuario obtenidos correctamente',
        totalServices: services.length,
        services,
      })
    } catch (error) {
      console.error(
        'Error en el controlador de obtener los servicio por creador:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
