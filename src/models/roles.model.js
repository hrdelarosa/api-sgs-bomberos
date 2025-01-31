import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class RolesModel {
  static async crear({ input }) {
    const { nombre, descripcion } = input

    try {
      await connection.query(
        'INSERT INTO roles (rol_nombre, rol_descripcion) VALUES (?, ?)',
        [nombre, descripcion]
      )
    } catch (error) {
      throwError('Error al crear el nuevo rol', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM roles WHERE rol_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar el role', error)
    }
  }

  static async obtener() {
    try {
      const [roles] = await connection.query(
        'SELECT BIN_TO_UUID(rol_id) AS id, rol_nombre, rol_descripcion FROM roles;'
      )

      return roles
    } catch (error) {
      throwError('Error al obtener los roles', error)
    }
  }

  static async obtenerPorNombre({ nombre }) {
    try {
      const [rol] = await connection.query(
        'SELECT BIN_TO_UUID(rol_id) AS id, rol_nombre, rol_descripcion FROM roles WHERE rol_nombre = ?;',
        [nombre]
      )

      return rol[0] || null
    } catch (error) {
      throwError('Error al obtener el rol', error)
    }
  }
}
