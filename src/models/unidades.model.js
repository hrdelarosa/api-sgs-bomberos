import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class UnidadesModel {
  static async crear({ input }) {
    const { tipo, unidad, estado } = input

    try {
      await connection.query(
        'INSERT INTO unidades (tu_id_uni, uni_numero, est_id_uni) VALUES(UUID_TO_BIN(?), ?, UUID_TO_BIN(?));',
        [tipo, unidad, estado]
      )
    } catch (error) {
      throwError('Error al crear la nueva unidad', error)
    }
  }

  static async actualizar({ input, id }) {
    const { estado } = input

    try {
      await connection.query(
        'UPDATE unidades SET est_id_uni = UUID_TO_BIN(?) WHERE uni_id = UUID_TO_BIN(?);',
        [estado, id]
      )
    } catch (error) {
      throwError('Error al crear la nueva unidad', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM unidades WHERE uni_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al elimnar la unidad', error)
    }
  }

  static async obtener() {
    try {
      const [unidades] = await connection.query(
        'SELECT BIN_TO_UUID(uni_id) AS id, tipounidad.tu_nombre, uni_numero, estados.est_nombre AS est_id_uni FROM unidades INNER JOIN tipounidad ON unidades.tu_id_uni = tipounidad.tu_id INNER JOIN estados ON unidades.est_id_uni = estados.est_id ORDER BY estados.est_nombre ASC;'
      )

      return unidades
    } catch (error) {
      throwError('Error al obtener las unidades', error)
    }
  }

  static async obtenerPorUnidad({ unidad }) {
    try {
      const [uni] = await connection.query(
        'SELECT BIN_TO_UUID(uni_id) AS id, BIN_TO_UUID(tu_id_uni) AS tu_id_uni, uni_numero, BIN_TO_UUID(est_id_uni) AS est_id_uni FROM unidades WHERE uni_numero = ?;',
        [unidad]
      )

      return uni[0] || null
    } catch (error) {
      throwError('Error al obtener la unidad', error)
    }
  }

  static async crearTipo({ input }) {
    const { tipo } = input

    try {
      await connection.query('INSERT INTO tipounidad (tu_nombre) VALUES(?);', [
        tipo,
      ])
    } catch (error) {
      throwError('Error al crear el nuevo tipo de unidad', error)
    }
  }

  static async eliminarTipo({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM tipounidad WHERE tu_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar el tipo de unidad', error)
    }
  }

  static async obtenerTipos() {
    try {
      const [tipos] = await connection.query(
        'SELECT BIN_TO_UUID(tu_id) AS id, tu_nombre FROM tipounidad;'
      )

      return tipos
    } catch (error) {
      throwError('Error al obtener los tipos de unidad', error)
    }
  }

  static async obtenerPorTipo({ tipo }) {
    try {
      const [tp] = await connection.query(
        'SELECT BIN_TO_UUID(tu_id) AS id, tu_nombre FROM tipounidad WHERE tu_nombre = ?;',
        [tipo]
      )

      return tp[0] || null
    } catch (error) {
      throwError('Error al obtener el tipo de unidad', error)
    }
  }
}
