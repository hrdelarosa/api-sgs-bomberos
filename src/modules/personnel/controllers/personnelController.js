import { PersonnelService } from '../service/personnelService.js'

export class PersonnelController {
  constructor({ personnelModel }) {
    this.personnelService = new PersonnelService({ personnelModel })
  }

  create = async (req, res) => {
    try {
      const { nombre, apellidos, np, rango, base, guardia } = req.body

      await this.personnelService.create({
        nombre,
        apellidos,
        np,
        rango,
        base,
        guardia,
      })

      res.status(201).json({ message: 'Personal creado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de crear el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changePersonnelStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body

      await this.personnelService.changePersonnelStatus({ id, estado })

      res.status(200).json({
        message: 'El estado del personal ha sido actualizado correctamente',
      })
    } catch (error) {
      console.error(
        'Error en el controlador de actualizar el estado del personal:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  deletePersonnel = async (req, res) => {
    try {
      const { id } = req.params

      await this.personnelService.deletePersonnel({ id })

      res.status(200).json({ message: 'Personal eliminado correctamente' })
    } catch (error) {
      console.error('Error en el controlador de eliminar el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getPersonnel = async (req, res) => {
    try {
      const personnel = await this.personnelService.getPersonnel()

      res
        .status(200)
        .json({ message: 'Personal obtenido correctamente', personnel })
    } catch (error) {
      console.error('Error en el controlador de obtener el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getPersonnelPerRank = async (req, res) => {
    try {
      const { id } = req.params
      const personnel = await this.personnelService.getPersonnelPerRank({ id })

      res
        .status(200)
        .json({ message: 'Personal obtenido correctamente', personnel })
    } catch (error) {
      console.error('Error en el controlador de obtener el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  getPersonnelPerGuard = async (req, res) => {
    try {
      const { id } = req.params
      const personnel = await this.personnelService.getPersonnelPerGuard({ id })

      res
        .status(200)
        .json({ message: 'Personal obtenido correctamente', personnel })
    } catch (error) {
      console.error('Error en el controlador de obtener el personal:', error)
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changePersonnelRank = async (req, res) => {
    try {
      const { id } = req.params
      const { rango } = req.body

      await this.personnelService.changePersonnelRank({ id, rango })

      res.status(200).json({
        message: 'El estado del personal ha sido actualizado correctamente',
      })
    } catch (error) {
      console.error(
        'Error en el controlador de actualizar el rango del personal:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }

  changePersonnelGuard = async (req, res) => {
    try {
      const { id } = req.params
      const { guardia } = req.body

      await this.personnelService.changePersonnelGuard({ id, guardia })

      res.status(200).json({
        message: 'El estado del personal ha sido actualizado correctamente',
      })
    } catch (error) {
      console.error(
        'Error en el controlador de actualizar la guardia del personal:',
        error
      )
      res.status(error.statusCode || 400).json({ message: error.message })
    }
  }
}
