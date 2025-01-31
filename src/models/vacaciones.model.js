import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class VacacionesModel {
  static async crear({ input, final }) {
    const { personal, inicio } = input

    try {
      await connection.query(
        'INSERT INTO vacaciones (per_id_va, va_inicio, va_final) VALUES (UUID_TO_BIN(?), ?, ?);',
        [personal, inicio, final]
      )
    } catch (error) {
      throwError('Error al crear las vacaciones', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM vacaciones WHERE va_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar la vacación', error)
    }
  }

  static async obtener() {
    try {
      const [vacaciones] = await connection.query(
        'SELECT BIN_TO_UUID(va_id) AS id, personal.per_nombres, personal.per_apellidos, personal.per_np, rango.ran_nombre, va_inicio, va_final, guardia.gu_nombre FROM vacaciones INNER JOIN personal ON vacaciones.per_id_va = personal.per_id  INNER JOIN guardia ON personal.gu_id_per = guardia.gu_id  INNER JOIN rango ON personal.ran_id_per = rango.ran_id;'
      )

      return vacaciones
    } catch (error) {
      throwError('Error al obtener las vacaciones', error)
    }
  }

  static async obtenerPorGuardiaVaca({ guardia, inicio }) {
    try {
      const [economicos] = await connection.query(
        'SELECT BIN_TO_UUID(va_id) AS id, personal.per_nombres, personal.per_apellidos, personal.per_np, rango.ran_nombre, va_inicio, va_final, guardia.gu_nombre FROM vacaciones INNER JOIN personal ON vacaciones.per_id_va = personal.per_id INNER JOIN guardia ON personal.gu_id_per = guardia.gu_id INNER JOIN rango ON personal.ran_id_per = rango.ran_id WHERE guardia.gu_nombre = ? AND va_inicio = ?;',
        [guardia, inicio]
      )

      return economicos
    } catch (error) {
      throwError('Error al obtner las vacaciones', error)
    }
  }

  static async obtenerUltimaPorPersonal({ personal }) {
    try {
      const [vacacion] = await connection.query(
        'SELECT va_final FROM vacaciones WHERE per_id_va = UUID_TO_BIN(?) ORDER BY va_final DESC LIMIT 1;',
        [personal]
      )
      return vacacion[0]
    } catch (error) {
      throwError('Error al obtener la última vacación del personal', error)
    }
  }
}
