import { connection } from '../../../config/db.js'

export class RolesModel {
  static async create({ nombre, descripcion }) {
    try {
      await connection.query(
        `INSERT INTO roles (rol_id, rol_nombre, rol_descripcion, est_id_rol) VALUES (UUID_TO_BIN(UUID()), ?, ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
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
        'SELECT * FROM roles WHERE rol_id = UUID_TO_BIN(?);',
        [id]
      )

      return role[0] || null
    } catch (error) {
      console.error('Error al obtener el role por id:', error)
      throw new Error('Error al obtener el role por id')
    }
  }

  static async updateStatusById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE roles SET est_id_rol = UUID_TO_BIN(?) WHERE rol_id = UUID_TO_BIN(?);',
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
        'SELECT BIN_TO_UUID(rol_id) AS id, rol_nombre, rol_descripcion, estados.est_nombre AS est_id_rol FROM roles INNER JOIN estados ON roles.est_id_rol = estados.est_id;'
      )

      return roles
    } catch (error) {
      console.error('Error al obtener los roles:', error)
      throw new Error('Error al obtener los roles')
    }
  }
}
