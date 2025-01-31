import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class PersonalModel {
  static async crear({ input }) {
    const { nombres, apellidos, np, rango, base, guardia } = input

    try {
      await connection.query(
        'INSERT INTO personal (per_nombres, per_apellidos, per_np, ran_id_per, per_base, gu_id_per) VALUES(?, ?, ?, UUID_TO_BIN(?), ?, UUID_TO_BIN(?));',
        [nombres, apellidos, np, rango, base, guardia]
      )
    } catch (error) {
      throwError('Error al crear el nuevo personal', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM personal WHERE per_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar la guardia', error)
    }
  }

  static async actualizarGuardia({ input, id }) {
    let query

    if (id === 'null') {
      id = null
      query = 'UPDATE personal SET gu_id_per = ? WHERE per_id = UUID_TO_BIN(?);'
    } else
      query =
        'UPDATE personal SET gu_id_per = UUID_TO_BIN(?) WHERE per_id = UUID_TO_BIN(?);'

    try {
      await connection.query(query, [id, input])
    } catch (error) {
      console.log(error)
      throwError('Error al actualizar la guardia al personal', error)
    }
  }

  static async obtener() {
    try {
      const [personal] = await connection.query(
        'SELECT BIN_TO_UUID(per_id) AS id, per_nombres, per_apellidos, per_np, rango.ran_nombre, per_base, guardia.gu_nombre, est.et_nombre, per_diasEco, per_vacaciones FROM personal LEFT JOIN rango ON personal.ran_id_per = rango.ran_id LEFT JOIN guardia ON personal.gu_id_per = guardia.gu_id LEFT JOIN estaciones est ON guardia.et_id_gu = est.et_id ORDER BY gu_nombre ASC;'
      )

      return personal
    } catch (error) {
      throwError('Error al obtener todos el personal', error)
    }
  }

  static async obtnerPorPersonal({ np }) {
    try {
      const [personal] = await connection.query(
        'SELECT BIN_TO_UUID(per_id) AS id, per_nombres, per_apellidos, per_np, BIN_TO_UUID(ran_id_per) AS ran_id_per, per_base, BIN_TO_UUID(gu_id_per) AS gu_id_per FROM personal WHERE per_np = ?;',
        [np]
      )

      return personal[0] || null
    } catch (error) {
      throwError('Error al obtener el personal', error)
    }
  }

  static async obtnerPorGuardia({ guard }) {
    try {
      const [personal] = await connection.query(
        'SELECT BIN_TO_UUID(per_id) AS id, per_nombres, per_apellidos, per_np, rango.ran_nombre, per_base, guardia.gu_nombre, est.et_nombre, per_diasEco, per_vacaciones FROM personal INNER JOIN rango ON personal.ran_id_per = rango.ran_id INNER JOIN guardia ON personal.gu_id_per = guardia.gu_id INNER JOIN estaciones est ON guardia.et_id_gu = est.et_id WHERE gu_id_per = UUID_TO_BIN(?);',
        [guard]
      )

      return personal
    } catch (error) {
      throwError('Error al obtener el personal', error)
    }
  }

  static async obtnerExcluirPorGuardia({ guard }) {
    try {
      const [personal] = await connection.query(
        'SELECT BIN_TO_UUID(per_id) AS id, per_nombres, per_apellidos, per_np, rango.ran_nombre, per_base, guardia.gu_nombre, est.et_nombre, per_diasEco, per_vacaciones FROM personal LEFT JOIN rango ON personal.ran_id_per = rango.ran_id LEFT JOIN guardia ON personal.gu_id_per = guardia.gu_id LEFT JOIN estaciones est ON guardia.et_id_gu = est.et_id WHERE guardia.gu_id IS NULL OR guardia.gu_id != UUID_TO_BIN(?) ORDER BY gu_nombre ASC;',
        [guard]
      )

      return personal
    } catch (error) {
      console.log(error)
      throwError('Error al obtener el personal', error)
    }
  }

  static async obtnerPorId({ id }) {
    try {
      const [personal] = await connection.query(
        'SELECT BIN_TO_UUID(per_id) AS id, per_nombres, per_apellidos, per_np, rango.ran_nombre, per_base, guardia.gu_nombre, per_diasEco, per_vacaciones, per_diasAdicionales FROM personal INNER JOIN rango ON personal.ran_id_per = rango.ran_id INNER JOIN guardia ON personal.gu_id_per = guardia.gu_id WHERE per_id = UUID_TO_BIN(?);',
        [id]
      )

      return personal[0] || null
    } catch (error) {
      throwError('Error al obtener el personal', error)
    }
  }

  static async actualizarDias({ dias, id }) {
    try {
      await connection.query(
        'UPDATE personal SET per_diasEco = ? WHERE per_id = UUID_TO_BIN(?);',
        [dias, id]
      )
    } catch (error) {
      throwError('Error al actualizar el día del personal', error)
    }
  }

  static async actualizarVacaciones({ periodos, id }) {
    try {
      await connection.query(
        'UPDATE personal SET per_vacaciones = ? WHERE per_id = UUID_TO_BIN(?);',
        [periodos, id]
      )
    } catch (error) {
      throwError('Error al actualizar el día del personal', error)
    }
  }
}
