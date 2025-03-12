import { connection } from '../../../config/db.js'

export class StatesServicesModel {
  static async getStatesService() {
    try {
      const [states] = await connection.query(
        'SELECT BIN_TO_UUID(estser_id) AS id, estser_nombre, estser_descripcion FROM estadosservicio;'
      )

      return states
    } catch (error) {
      console.error('Error al obtener los estados:', error)
      throw new Error('Error al obtener los estados')
    }
  }
}
