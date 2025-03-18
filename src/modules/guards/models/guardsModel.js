import { connection } from '../../../config/db.js'

export class GuardsModel {
  static async create({ nombre, estacion }) {
    try {
      await connection.query(
        'INSERT INTO guardia (gu_id, gu_nombre, et_id_gu) VALUES (UNHEX(REPLACE(UUID(), "-", "")), ?, UNHEX(REPLACE(?, "-", "")));',
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
        'SELECT LOWER(CONCAT(LEFT(HEX(gu_id), 8), "-", MID(HEX(gu_id), 9, 4), "-", MID(HEX(gu_id), 13, 4), "-", MID(HEX(gu_id), 17, 4), "-", RIGHT(HEX(gu_id), 12))) AS id, gu_nombre, LOWER(CONCAT(LEFT(HEX(et_id_gu), 8), "-", MID(HEX(et_id_gu), 9, 4), "-", MID(HEX(et_id_gu), 13, 4), "-", MID(HEX(et_id_gu), 17, 4), "-", RIGHT(HEX(et_id_gu), 12))) AS et_id_gu FROM guardia WHERE gu_nombre = ?;',
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
      await connection.query(
        'DELETE FROM guardia WHERE gu_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )
    } catch (error) {
      console.error('Error al eliminar la guardia por id:', error)
      throw new Error('Error al eliminar la guardia por id')
    }
  }

  static async guardsRelatedPersonnel({ id }) {
    try {
      const [countPersonnel] = await connection.query(
        'SELECT COUNT(*) as count FROM personal WHERE gu_id_per = UNHEX(REPLACE(?, "-", ""));',
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
        'SELECT LOWER(CONCAT(LEFT(HEX(gu_id), 8), "-", MID(HEX(gu_id), 9, 4), "-", MID(HEX(gu_id), 13, 4), "-", MID(HEX(gu_id), 17, 4), "-", RIGHT(HEX(gu_id), 12))) AS id, gu_nombre, LOWER(CONCAT(LEFT(HEX(et_id_gu), 8), "-", MID(HEX(et_id_gu), 9, 4), "-", MID(HEX(et_id_gu), 13, 4), "-", MID(HEX(et_id_gu), 17, 4), "-", RIGHT(HEX(et_id_gu), 12))) AS et_id_gu FROM guardia WHERE gu_id = UNHEX(REPLACE(?, "-", ""));',
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
        'SELECT LOWER(CONCAT(LEFT(HEX(gu_id), 8), "-", MID(HEX(gu_id), 9, 4), "-", MID(HEX(gu_id), 13, 4), "-", MID(HEX(gu_id), 17, 4), "-", RIGHT(HEX(gu_id), 12))) AS id, gu_nombre, estaciones.et_nombre FROM guardia INNER JOIN estaciones ON guardia.et_id_gu = estaciones.et_id;'
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
        'SELECT LOWER(CONCAT(LEFT(HEX(gu_id), 8), "-", MID(HEX(gu_id), 9, 4), "-", MID(HEX(gu_id), 13, 4), "-", MID(HEX(gu_id), 17, 4), "-", RIGHT(HEX(gu_id), 12))) AS id, gu_nombre, estaciones.et_nombre FROM guardia INNER JOIN estaciones ON guardia.et_id_gu = estaciones.et_id WHERE et_id_gu = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return guards
    } catch (error) {
      console.error('Error al obtener las guardias por estación:', error)
      throw new Error('Error al obtener las guardias por estación')
    }
  }
}
