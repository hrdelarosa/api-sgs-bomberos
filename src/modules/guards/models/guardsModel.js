import { connection } from '../../../config/db.js'

export class GuardsModel {
  static async create({ nombre, estacion }) {
    try {
      await connection.query(
        'INSERT INTO guardia (gu_nombre, et_id_gu) VALUES (?, ?);',
        [nombre, estacion]
      )
    } catch (error) {
      console.error('Error al crear una nueva guardia:', error)
      throw new Error('Error al crear una nueva guardia')
    }
  }

  static async findGuardByName({ nombre }) {
    try {
      const [guard] = await connection.query(
        'SELECT * FROM guardia WHERE gu_nombre = ?;',
        [nombre]
      )

      return guard[0] || null
    } catch (error) {
      console.error('Error al obtener la guardia por nombre:', error)
      throw new Error('Error al obtener la guardia por nombre')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM guardia WHERE gu_id = ?;', [id])
    } catch (error) {
      console.error('Error al eliminar la guardia por id:', error)
      throw new Error('Error al eliminar la guardia por id')
    }
  }

  static async guardsRelatedPersonnel({ id }) {
    try {
      const [countPersonnel] = await connection.query(
        'SELECT COUNT(*) as count FROM personal WHERE gu_id_per = ?;',
        [id]
      )

      return countPersonnel[0].count
    } catch (error) {
      console.error(
        'Error al obtener el personal relacionados con la guardia:',
        error
      )
      throw new Error(
        'Error al obtener el personal relacionados con la guardia'
      )
    }
  }

  static async findGuardById({ id }) {
    try {
      const [guard] = await connection.query(
        'SELECT gu_id, gu_nombre, et_id_gu, estaciones.et_nombre FROM guardia INNER JOIN estaciones ON guardia.et_id_gu = estaciones.et_id WHERE gu_id = ?;',
        [id]
      )

      return guard[0] || null
    } catch (error) {
      console.error('Error al obtener la guardia por id:', error)
      throw new Error('Error al obtener la guardia por id')
    }
  }

  static async getGuards() {
    try {
      const [guards] = await connection.query(
        'SELECT gu_id, gu_nombre, et_id_gu, estaciones.et_nombre FROM guardia INNER JOIN estaciones ON guardia.et_id_gu = estaciones.et_id;'
      )

      return guards
    } catch (error) {
      console.error('Error al obtener las guardias:', error)
      throw new Error('Error al obtener las guardias')
    }
  }

  static async getGuardsPerStations({ id }) {
    try {
      const [guards] = await connection.query(
        'SELECT gu_id, gu_nombre, et_id_gu, estaciones.et_nombre FROM guardia INNER JOIN estaciones ON guardia.et_id_gu = estaciones.et_id WHERE et_id_gu = ?;',
        [id]
      )

      return guards
    } catch (error) {
      console.error('Error al obtener las guardias por estación:', error)
      throw new Error('Error al obtener las guardias por estación')
    }
  }
}
