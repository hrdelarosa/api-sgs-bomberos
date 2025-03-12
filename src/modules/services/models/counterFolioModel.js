import { connection } from '../../../config/db.js'

export class CounterFolioModel {
  static async createCounter({ date, count }) {
    try {
      await connection.query(
        'INSERT INTO foliocontador (fecha, contador) VALUES (?, ?);',
        [date, count]
      )
    } catch (error) {
      console.error('Error al crear un nuevo contador:', error)
      throw new Error('Error al crear un nuevo contador')
    }
  }

  static async updateCounter({ count, date }) {
    try {
      await connection.query(
        'UPDATE foliocontador SET contador = ? WHERE fecha = ?;',
        [count, date]
      )
    } catch (error) {
      console.error('Error al actualizar el contador:', error)
      throw new Error('Error al actualizar el contador')
    }
  }

  static async findCounterByDate({ date }) {
    try {
      const [counter] = await connection.query(
        'SELECT contador FROM foliocontador WHERE fecha = ?;',
        [date]
      )

      return counter
    } catch (error) {
      console.error('Error al obtener los contadores:', error)
      throw new Error('Error al obtener los contadores')
    }
  }
}
