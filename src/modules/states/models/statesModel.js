import { connection } from '../../../config/db.js'

export class StatesModel {
  static async getStates() {
    try {
      const [states] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(est_id), 8), "-", MID(HEX(est_id), 9, 4), "-", MID(HEX(est_id), 13, 4), "-", MID(HEX(est_id), 17, 4), "-", RIGHT(HEX(est_id), 12))) AS id, est_nombre, est_descripcion FROM estados;'
      )

      return states
    } catch (error) {
      console.error('Error al obtener los estados:', error)
      throw new Error('Error al obtener los estados')
    }
  }
}
