import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class UsuariosModel {
  static async actualizar({ input, id }) {
    const { rol, estado } = input
    const valores = []
    const campos = []

    try {
      if (rol) {
        campos.push('rol_id_us = UUID_TO_BIN(?)')
        valores.push(rol)
      }

      if (estado) {
        campos.push('est_id_us = UUID_TO_BIN(?)')
        valores.push(estado)
      }

      valores.push(id)

      const query = `UPDATE Usuarios SET ${campos.join(
        ', '
      )} WHERE us_id = UUID_TO_BIN(?)`

      await connection.query(query, valores)
    } catch (error) {
      throwError('Error al actualizar el usuario', error)
    }
  }

  static async eliminar({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM usuarios WHERE us_id = UUID_TO_BIN(?);',
        [id]
      )

      return result
    } catch (error) {
      throwError('Error al eliminar el usuario', error)
    }
  }

  static async obtener() {
    try {
      const [usuarios] = await connection.query(
        'SELECT BIN_TO_UUID(us_id) AS id, us_nombres, us_apellidos, us_correo, roles.rol_nombre, estados.est_nombre, us_verificado, us_creado, us_actualizacion FROM usuarios INNER JOIN roles ON usuarios.rol_id_us = roles.rol_id INNER JOIN estados ON usuarios.est_id_us = estados.est_id;'
      )

      return usuarios
    } catch (error) {
      throwError('Error al obtener los usuarios', error)
    }
  }
}
