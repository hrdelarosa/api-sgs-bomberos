import { RanksService } from '../services/ranksService.js'

export class RanksController {
  constructor({ ranksModel }) {
    this.ranksService = new RanksService({ ranksModel })
  }

  create = async (req, res) => {
    try {
      const { nombre } = req.body

      await this.ranksService.create({ nombre })

      res.status(201).json({ message: 'Rango creado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear un rango:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changeRankStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.ranksService.changeRankStatus({ id, estado })

      res
        .status(200)
        .json({ message: 'Estado del rango actualizado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de actualizar el rango:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deleteRank = async (req, res) => {
    try {
      const { id } = req.params

      await this.ranksService.deleteRank({ id })

      res.status(200).json({ message: 'Rango eliminado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar el rango:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getRanks = async (req, res) => {
    try {
      const ranks = await this.ranksService.getRanks()

      res.status(200).json({ message: 'Rangos obtenidos correctamente', ranks })
    } catch (error) {
      console.error('Error en el controlador de obtener los rangos:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
