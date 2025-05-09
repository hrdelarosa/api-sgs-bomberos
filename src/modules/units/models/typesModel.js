import { connection } from '../../../config/db.js'

export class TypeModel {
  static async create({ nombre }) {
    try {
      await connection.query(
        `INSERT INTO tipounidad (tu_nombre, est_id_tu) VALUES(?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
        [nombre]
      )
    } catch (error) {
      console.error('Error al crear el nuevo tipo:', error)
      throw new Error('Error al crear el nuevo tipo')
    }
  }

  static async findTypeByName({ nombre }) {
    try {
      const [type] = await connection.query(
        'SELECT estados.est_nombre AS est_id_tu FROM tipounidad INNER JOIN estados ON tipounidad.est_id_tu = estados.est_id WHERE tu_nombre = ?;',
        [nombre]
      )

      return type[0] || null
    } catch (error) {
      console.error('Error al obtener el tipo por nombre:', error)
      throw new Error('Error al obtener el tipo por nombre')
    }
  }

  static async updateStatusById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE tipounidad SET est_id_tu = ? WHERE tu_id = ?;',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar el tipo por id:', error)
      throw new Error('Error al actualizar el tipo por id')
    }
  }

  static async findTypeById({ id }) {
    try {
      const [type] = await connection.query(
        'SELECT est_id_tu, estados.est_nombre FROM tipounidad INNER JOIN estados ON tipounidad.est_id_tu = estados.est_id WHERE tu_id = ?;',
        [id]
      )

      return type[0] || null
    } catch (error) {
      console.error('Error al obtener el tipo por id:', error)
      throw new Error('Error al obtener el tipo por id')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM tipounidad WHERE tu_id = ?;', [id])
    } catch (error) {
      console.error('Error al eliminar el tipo por id:', error)
      throw new Error('Error al eliminar el tipo por id')
    }
  }

  static async typeRelatedUnits({ id }) {
    try {
      const [countUnits] = await connection.query(
        'SELECT COUNT(*) as count FROM unidades WHERE tu_id_uni = ?;',
        [id]
      )

      return countUnits[0].count
    } catch (error) {
      console.error(
        'Error al obtener las unidades relacionadas con el tipo:',
        error
      )
      throw new Error('Error al obtener las unidades relacionadas con el tipo')
    }
  }

  static async getTypes() {
    try {
      const [types] = await connection.query(
        'SELECT tu_id, tu_nombre, est_id_tu, estados.est_nombre FROM tipounidad INNER JOIN estados ON tipounidad.est_id_tu = estados.est_id;'
      )

      return types
    } catch (error) {
      console.error('Error al obtener los tipos:', error)
      throw new Error('Error al obtener los tipos')
    }
  }
}
