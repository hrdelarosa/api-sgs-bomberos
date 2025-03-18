import { connection } from '../../../config/db.js'

export class RolesModel {
  static async create({ nombre, descripcion }) {
    try {
      await connection.query(
        `INSERT INTO roles (rol_id, rol_nombre, rol_descripcion, est_id_rol) VALUES (UNHEX(REPLACE(UUID(), '-', '')), ?, ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
        [nombre, descripcion]
      )
    } catch (error) {
      console.error('Error al crear un nuevo role:', error)
      throw new Error('Error al crear un nuevo role')
    }
  }

  static async findRoleByName({ nombre }) {
    try {
      const [role] = await connection.query(
        'SELECT * FROM roles WHERE rol_nombre = ?;',
        [nombre]
      )

      return role[0] || null
    } catch (error) {
      console.error('Error al obtener el role por nombre:', error)
      throw new Error('Error al obtener el role por nombre')
    }
  }

  static async findRoleById({ id }) {
    try {
      const [role] = await connection.query(
        'SELECT estados.est_nombre AS est_id_rol FROM roles INNER JOIN estados ON roles.est_id_rol = estados.est_id WHERE rol_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return role[0] || null
    } catch (error) {
      console.error('Error al obtener el role por id:', error)
      throw new Error('Error al obtener el role por id')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(
        'DELETE FROM roles WHERE rol_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )
    } catch (error) {
      console.error('Error al eliminar el rol por id:', error)
      throw new Error('Error al eliminar el rol por id')
    }
  }

  static async roleRelatedUsers({ id }) {
    try {
      const countUnits = await connection.query(
        'SELECT COUNT(*) AS count FROM usuarios WHERE rol_id_us = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return countUnits[0].count
    } catch (error) {
      console.error(
        'Error al obtener la cantidad de servicios relacionados con la unidad:',
        error
      )
      throw new Error(
        'Error al obtener la cantidad de servicios relacionados con la unidad'
      )
    }
  }

  static async updateStatusById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE roles SET est_id_rol = UNHEX(REPLACE(?, "-", "")) WHERE rol_id = UNHEX(REPLACE(?, "-", ""));',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar el role por id:', error)
      throw new Error('Error al actualizar el role por id')
    }
  }

  static async getRoles() {
    try {
      const [roles] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(rol_id), 8), "-", MID(HEX(rol_id), 9, 4), "-", MID(HEX(rol_id), 13, 4), "-", MID(HEX(rol_id), 17, 4), "-", RIGHT(HEX(rol_id), 12))) AS id, rol_nombre, rol_descripcion, estados.est_nombre AS est_id_rol FROM roles INNER JOIN estados ON roles.est_id_rol = estados.est_id;'
      )

      return roles
    } catch (error) {
      console.error('Error al obtener los roles:', error)
      throw new Error('Error al obtener los roles')
    }
  }
}
