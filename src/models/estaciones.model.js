import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class EstacionesModel {
  static async crear({ input }) {
    const { nombre, ubicacion, estado } = input

    try {
      await connection.query(
        'INSERT INTO estaciones (et_nombre, et_ubicacion, est_id_et) VALUES(?, ?, UUID_TO_BIN(?));',
        [nombre, ubicacion, estado]
      )
    } catch (error) {
      throwError('Error al crear la nueva estación', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM estaciones WHERE et_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar la estación', error)
    }
  }

  static async obtener() {
    try {
      const [estaciones] = await connection.query(
        'SELECT BIN_TO_UUID(et_id) AS id, et_nombre, et_ubicacion, estados.est_nombre AS est_id_et FROM estaciones INNER JOIN estados ON estaciones.est_id_et = estados.est_id ORDER BY est_id_et ASC;'
      )

      return estaciones
    } catch (error) {
      throwError('Error al obtener las estaciones', error)
    }
  }

  static async obtenerPorEstacion({ nombre }) {
    try {
      const [esta] = await connection.query(
        'SELECT BIN_TO_UUID(et_id) AS id, et_nombre, et_ubicacion, BIN_TO_UUID(est_id_et) AS est_id_et FROM estaciones WHERE et_nombre = ?;',
        [nombre]
      )
      return esta[0] || null
    } catch (error) {
      throwError('Error al obtener la estación', error)
    }
  }
}
