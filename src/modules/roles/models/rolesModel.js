import { connection } from '../../../config/db.js'

export class RolesModel {
  static async create({ nombre, descripcion }) {
    try {
      await connection.query(
        `INSERT INTO roles (rol_nombre, rol_descripcion, est_id_rol) VALUES (?, ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
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
        'SELECT est_id_rol, estados.est_nombre FROM roles INNER JOIN estados ON roles.est_id_rol = estados.est_id WHERE rol_id = ?;',
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
      await connection.query('DELETE FROM roles WHERE rol_id = ?;', [id])
    } catch (error) {
      console.error('Error al eliminar el rol por id:', error)
      throw new Error('Error al eliminar el rol por id')
    }
  }

  static async roleRelatedUsers({ id }) {
    try {
      const [countUsers] = await connection.query(
        'SELECT COUNT(*) AS count FROM usuarios WHERE rol_id_us = ?;',
        [id]
      )

      return countUsers[0].count
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
        'UPDATE roles SET est_id_rol = ? WHERE rol_id = ?;',
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
        'SELECT rol_id, rol_nombre, rol_descripcion, est_id_rol, estados.est_nombre FROM roles INNER JOIN estados ON roles.est_id_rol = estados.est_id;'
      )

      return roles
    } catch (error) {
      console.error('Error al obtener los roles:', error)
      throw new Error('Error al obtener los roles')
    }
  }
}
