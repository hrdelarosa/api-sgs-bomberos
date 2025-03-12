import { TypesService } from '../services/typesService.js'

export class TypesController {
  constructor({ typesModel }) {
    this.typesService = new TypesService({ typesModel })
  }

  create = async (req, res) => {
    try {
      const { nombre } = req.body

      await this.typesService.create({ nombre })

      res.status(201).json({ message: 'Tipo creado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear un tipo:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changeTypeStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.typesService.changeTypeStatus({ id, estado })

      res
        .status(200)
        .json({ message: 'Estado del tipo ha sido actualizado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de actualizar el tipo:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteType = async (req, res) => {
    try {
      const { id } = req.params

      await this.typesService.deleteType({ id })

      res.status(200).json({ message: 'Tipo eliminado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar el tipo:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getTypes = async (req, res) => {
    try {
      const units = await this.typesService.getTypes()

      res.status(200).json({ message: 'Tipo obtenidos correctamente', units })
    } catch (error) {
      console.error('Error en el controlador de obtener los tipos:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
