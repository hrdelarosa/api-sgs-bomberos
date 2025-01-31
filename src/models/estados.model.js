import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class EstadosModel {
  static async obtener() {
    try {
      const [estados] = await connection.query(
        'SELECT BIN_TO_UUID(est_id) AS id, est_nombre, est_descripcion FROM estados;'
      )

      return estados
    } catch (error) {
      throwError('Error al obtener los estados', error)
    }
  }

  static async obtenerPorId({ id }) {
    try {
      const [estado] = await connection.query(
        'SELECT BIN_TO_UUID(est_id) AS id, est_nombre, est_descripcion FROM estados WHERE est_id = UUID_TO_BIN(?);',
        [id]
      )

      return estado[0] || null
    } catch (error) {
      throwError('Error al obtener el estado por el id', error)
    }
  }

  static async obtenerPorNombre({ nombre }) {
    try {
      const [estado] = await connection.query(
        'SELECT BIN_TO_UUID(est_id) AS id, est_nombre, est_descripcion FROM estados WHERE est_nombre = ?;',
        [nombre]
      )

      return estado[0] || null
    } catch (error) {
      throwError('Error al obtener el estado por el nombre', error)
    }
  }
}
