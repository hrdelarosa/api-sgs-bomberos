import { connection } from '../../../config/db.js'

export class UsersModel {
  static async updateStateById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE usuarios SET est_id_us = ? WHERE us_id = ?',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar el estado del usuario por id:', error)
      throw new Error('Error al actualizar el estado del usuario por id')
    }
  }

  static async updateRoleById({ rol, id }) {
    try {
      await connection.query(
        'UPDATE usuarios SET rol_id_us = ? WHERE us_id = ?',
        [rol, id]
      )
    } catch (error) {
      console.error('Error al actualizar el role del usuario por id:', error)
      throw new Error('Error al actualizar el role del usuario por id')
    }
  }

  static async findUserById({ id }) {
    try {
      const [user] = await connection.query(
        'SELECT est_id_us, estados.est_nombre, rol_id_us, roles.rol_nombre FROM usuarios INNER JOIN roles ON rol_id_us = roles.rol_id INNER JOIN estados ON usuarios.est_id_us = estados.est_id WHERE us_id = ?;',
        [id]
      )

      return user[0] || null
    } catch (error) {
      console.error('Error al obtener el usuario por id:', error)
      throw new Error('Error al obtener el usuario por id')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM usuarios WHERE us_id = ?', [id])
    } catch (error) {
      console.error('Error al eliminar el usuario por id:', error)
      throw new Error('Error al eliminar el usuario por id')
    }
  }

  static async userRelatedService({ id }) {
    try {
      const [countService] = await connection.query(
        'SELECT COUNT(*) as count FROM servicio WHERE us_id_ser = ?',
        [id]
      )

      return countService[0].count
    } catch (error) {
      console.error(
        'Error al obtener los servicios relacionadas con el usuario:',
        error
      )
      throw new Error(
        'Error al obtener los servicios relacionadas con el usuario'
      )
    }
  }

  static async getUsers() {
    try {
      const [users] = await connection.query(
        'SELECT us_id, us_nombres, us_apellidos, us_correo, rol_id_us, roles.rol_nombre, est_id_us, estados.est_nombre, us_verificado, us_creado, us_actualizacion, COUNT(servicio.ser_id) AS total_servicios FROM usuarios INNER JOIN roles ON rol_id_us = roles.rol_id INNER JOIN estados ON est_id_us = estados.est_id LEFT JOIN servicio ON servicio.us_id_ser = us_id GROUP BY us_id;'
      )

      return users
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
      throw new Error('Error al obtener los usuarios')
    }
  }
}
