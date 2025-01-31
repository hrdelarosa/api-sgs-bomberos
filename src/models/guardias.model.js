import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class GuardiasModel {
  static async crear({ input }) {
    const { guardia, estacion } = input

    try {
      await connection.query(
        'INSERT INTO guardia (gu_nombre, et_id_gu) VALUES(?, UUID_TO_BIN(?));',
        [guardia, estacion]
      )
    } catch (error) {
      throwError('Error al crear una nueva guardia', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM guardia WHERE gu_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar la guardia', error)
    }
  }

  static async obtener() {
    try {
      const [estaciones] = await connection.query(
        'SELECT BIN_TO_UUID(gu_id) AS id, gu_nombre, estaciones.et_nombre FROM guardia INNER JOIN estaciones ON guardia.et_id_gu = estaciones.et_id;'
      )

      return estaciones
    } catch (error) {
      throwError('Error al obtener las guardias', error)
    }
  }

  static async obtenerPorGuardia({ guardia }) {
    try {
      const [guar] = await connection.query(
        'SELECT BIN_TO_UUID(gu_id) AS id, gu_nombre, BIN_TO_UUID(et_id_gu) AS et_id_gu FROM guardia WHERE gu_nombre = ?;',
        [guardia]
      )

      return guar[0] || null
    } catch (error) {
      throwError('Error al obtener la guardia', error)
    }
  }
}
