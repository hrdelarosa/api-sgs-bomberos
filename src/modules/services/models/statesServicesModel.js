import { connection } from '../../../config/db.js'

export class StatesServicesModel {
  static async getStatesService() {
    try {
      const [states] = await connection.query('SELECT * FROM estadosservicio;')

      return states
    } catch (error) {
      console.error('Error al obtener los estados:', error)
      throw new Error('Error al obtener los estados')
    }
  }
}
