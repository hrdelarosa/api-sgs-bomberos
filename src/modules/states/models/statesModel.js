import { connection } from '../../../config/db.js'

export class StatesModel {
  static async getStates() {
    try {
      const [states] = await connection.query(
        'SELECT BIN_TO_UUID(est_id) AS id, est_nombre, est_descripcion FROM estados;'
      )

      return states
    } catch (error) {
      console.error('Error al obtener los estados:', error)
      throw new Error('Error al obtener los estados')
    }
  }
}
