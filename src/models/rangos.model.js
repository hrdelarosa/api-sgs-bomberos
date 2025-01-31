import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class RangosModel {
  static async crear({ input }) {
    const { nombre } = input

    try {
      await connection.query('INSERT INTO rango (ran_nombre) VALUES(?);', [
        nombre,
      ])
    } catch (error) {
      throwError('Error al crear un nuevo rango', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM rango WHERE ran_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar el rango', error)
    }
  }

  static async obtener() {
    try {
      const [rangos] = await connection.query(
        'SELECT BIN_TO_UUID(ran_id) AS id, ran_nombre FROM rango;'
      )

      return rangos
    } catch (error) {
      throwError('Error al obtener todos los rango', error)
    }
  }

  static async obtenerPorNombre({ nombre }) {
    try {
      const [rango] = await connection.query(
        'SELECT BIN_TO_UUID(ran_id) AS id, ran_nombre FROM rango WHERE ran_nombre = ?;',
        [nombre]
      )

      return rango[0] || null
    } catch (error) {
      throwError('Error al obtener el rango', error)
    }
  }
}
