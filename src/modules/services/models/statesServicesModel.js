import { connection } from '../../../config/db.js'

export class StatesServicesModel {
  static async getStatesService() {
    try {
      const [states] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(estser_id), 8), "-", MID(HEX(estser_id), 9, 4), "-", MID(HEX(estser_id), 13, 4), "-", MID(HEX(estser_id), 17, 4), "-", RIGHT(HEX(estser_id), 12))) AS id, estser_nombre, estser_descripcion FROM estadosservicio;'
      )

      return states
    } catch (error) {
      console.error('Error al obtener los estados:', error)
      throw new Error('Error al obtener los estados')
    }
  }
}
