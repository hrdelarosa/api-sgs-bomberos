import { ContadorModel } from '../models/contador.model.js'
import { IncidentesModel } from '../models/servicio/incidentes.model.js'
import dayjs from 'dayjs'

export class ServiciosController {
  constructor({ serviciosModel }) {
    this.serviciosModel = serviciosModel
  }

  crearServicio = async (req, res) => {
    const {
      unidades,
      personal,
      incendio,
      fuga,
      abejas,
      rescate,
      daños,
      legales,
    } = req.body
    const fecha = dayjs().format('YYYYMMDD')

    try {
      const contador = await ContadorModel.obtener({ fecha })
      let cont = 1

      if (contador.length > 0) {
        cont = contador[0].contador + 1
        await ContadorModel.actualizar({ contador: cont, fecha })
      } else await ContadorModel.crear({ fecha, contador: cont })

      const folio = `${fecha}-${cont.toString().padStart(4, '0')}`

      const id = await this.serviciosModel.insertarServicio({
        input: req.body,
        folio,
      })

      if (personal && Array.isArray(personal) && personal.length > 0) {
        for (const persona of personal) {
          await this.serviciosModel.insertarPersonal({
            id,
            idPersonal: persona,
          })
        }
      }

      if (unidades && Array.isArray(unidades) && unidades.length > 0) {
        for (const unidad of unidades) {
          await this.serviciosModel.insertarUnidades({ id, idUnidad: unidad })
        }
      }

      if (incendio && Object.keys(incendio).length > 0)
        await IncidentesModel.insertarIncendio({ input: incendio, id })

      if (fuga && Object.keys(fuga).length > 0)
        await IncidentesModel.insertarFuga({ input: fuga, id })

      if (abejas && Object.keys(abejas).length > 0)
        await IncidentesModel.insertarAbejas({ input: abejas, id })

      if (rescate && Object.keys(rescate).length > 0)
        await IncidentesModel.insertarRescate({ input: rescate, id })

      if (daños && Object.values(daños).some((value) => value !== ''))
        await this.serviciosModel.insertarDaños({ input: daños, id })

      if (legales && Object.values(legales).some((value) => value !== ''))
        await this.serviciosModel.insertarLegales({ input: legales, id })

      res.status(201).json({
        message: 'Se ha creado el servicio correctamente',
        data: id,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: `Error al crear el nuevo servicio: ${error}`,
      })
    }
  }

  eliminarServicio = async (req, res) => {
    const { id } = req.params

    try {
      await this.serviciosModel.borrarLegales({ id })
      await this.serviciosModel.borrarDaños({ id })
      await IncidentesModel.borrarRescate({ id })
      await IncidentesModel.borrarAbejas({ id })
      await IncidentesModel.borrarFuga({ id })
      await IncidentesModel.borrarIncendio({ id })
      await this.serviciosModel.borrarUnidades({ id })
      await this.serviciosModel.borrarPersonal({ id })
      await this.serviciosModel.borrarServicio({ id })

      res.status(204).send()
    } catch (error) {
      res.status(500).json({
        message: `Error al eliminar el servicio: ${error}`,
      })
    }
  }

  obtenerServicios = async (req, res) => {
    try {
      const servicios = await this.serviciosModel.obtener()

      if (servicios.length === 0)
        return res.status(404).json({
          error: 'Servicios no encontrados. Aun no hay servicios guardados',
        })

      res.status(200).json({
        message: 'Se han obtenido todos los servicios correctamente',
        data: servicios,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener los servicios: ${error}`,
      })
    }
  }

  obtenerServicioPorId = async (req, res) => {
    const { id } = req.params

    try {
      const servicio = await this.serviciosModel.obtenerPorId({ id })
      if (!servicio)
        return res.status(404).json({
          error: 'Servicio no encontrado',
        })

      res.status(200).json({
        message: 'Se ha obtenido el servicio correctamente',
        data: servicio,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener el servicio: ${error}`,
      })
    }
  }

  obtenerServicioPorCreador = async (req, res) => {
    const { id } = req.params

    try {
      const servicios = await this.serviciosModel.obtenerPorCreador({ id })
      if (!servicios)
        return res.status(404).json({
          error: 'Servicios no encontrados',
        })

      res.status(200).json({
        message: 'Se ha obtenido el servicio correctamente',
        data: servicios,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener el servicio: ${error}`,
      })
    }
  }
}
