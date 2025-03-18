import { connection } from '../../../config/db.js'

export class UsersModel {
  static async updateStateById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE usuarios SET est_id_us = UNHEX(REPLACE(?, "-", "")) WHERE us_id = UNHEX(REPLACE(?, "-", ""));',
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
        'UPDATE usuarios SET rol_id_us = UNHEX(REPLACE(?, "-", "")) WHERE us_id = UNHEX(REPLACE(?, "-", ""));',
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
        'SELECT estados.est_nombre AS est_id_us FROM usuarios INNER JOIN estados ON usuarios.est_id_us = estados.est_id WHERE us_id = UNHEX(REPLACE(?, "-", ""));',
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
      await connection.query(
        'DELETE FROM usuarios WHERE us_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )
    } catch (error) {
      console.error('Error al eliminar el usuario por id:', error)
      throw new Error('Error al eliminar el usuario por id')
    }
  }

  static async userRelatedService({ id }) {
    try {
      const [countService] = await connection.query(
        'SELECT COUNT(*) as count FROM servicio WHERE us_id_ser = UNHEX(REPLACE(?, "-", ""));',
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
        'SELECT LOWER(CONCAT(LEFT(HEX(us_id), 8), "-", MID(HEX(us_id), 9, 4), "-", MID(HEX(us_id), 13, 4), "-", MID(HEX(us_id), 17, 4), "-", RIGHT(HEX(us_id), 12))) AS id, us_nombres, us_apellidos, us_correo, roles.rol_nombre AS rol_id_us, estados.est_nombre AS est_id_us, us_verificado, us_creado, us_actualizacion FROM usuarios INNER JOIN roles ON usuarios.rol_id_us = roles.rol_id INNER JOIN estados ON usuarios.est_id_us = estados.est_id;'
      )

      return users
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
      throw new Error('Error al obtener los usuarios')
    }
  }
}
