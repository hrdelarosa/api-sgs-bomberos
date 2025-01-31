import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class EconomicosModel {
  static async crear({ input }) {
    const { personal, dia } = input

    try {
      await connection.query(
        'INSERT INTO diaseconomicos (per_id_de, de_dia) VALUES (UUID_TO_BIN(?), ?);',
        [personal, dia]
      )
    } catch (error) {
      throwError('Error al crear el día económico', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM diaseconomicos WHERE de_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar el día económico', error)
    }
  }

  static async obtener() {
    try {
      const [economicos] = await connection.query(
        'SELECT BIN_TO_UUID(de_id) AS id, personal.per_nombres, personal.per_apellidos, personal.per_np, rango.ran_nombre, de_dia, guardia.gu_nombre FROM diaseconomicos INNER JOIN personal ON diaseconomicos.per_id_de = personal.per_id INNER JOIN guardia ON personal.gu_id_per = guardia.gu_id INNER JOIN rango ON personal.ran_id_per = rango.ran_id;'
      )

      return economicos
    } catch (error) {
      throwError('Error al obtner los días económicos', error)
    }
  }

  static async obtenerPorGuardiaDia({ guardia, dia }) {
    try {
      const [economicos] = await connection.query(
        'SELECT BIN_TO_UUID(de_id) AS id, personal.per_nombres, personal.per_apellidos, personal.per_np, rango.ran_nombre, de_dia, guardia.gu_nombre FROM diaseconomicos INNER JOIN personal ON diaseconomicos.per_id_de = personal.per_id INNER JOIN guardia ON personal.gu_id_per = guardia.gu_id INNER JOIN rango ON personal.ran_id_per = rango.ran_id WHERE guardia.gu_nombre = ? AND de_dia = ?;',
        [guardia, dia]
      )

      return economicos
    } catch (error) {
      throwError('Error al obtner los días económicos', error)
    }
  }
}
