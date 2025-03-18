import { connection } from '../../../config/db.js'

export class RanksModel {
  static async create({ nombre }) {
    try {
      await connection.query(
        `INSERT INTO rango (ran_id, ran_nombre, est_id_ran) VALUES (UNHEX(REPLACE(UUID(), '-', '')), ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
        [nombre]
      )
    } catch (error) {
      console.error('Error al crear el nuevo rango:', error)
      throw new Error('Error al crear el nuevo rango')
    }
  }

  static async findRankByName({ nombre }) {
    try {
      const [rank] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(ran_id), 8), "-", MID(HEX(ran_id), 9, 4), "-", MID(HEX(ran_id), 13, 4), "-", MID(HEX(ran_id), 17, 4), "-", RIGHT(HEX(ran_id), 12))) AS id, ran_nombre, LOWER(CONCAT(LEFT(HEX(est_id_ran), 8), "-", MID(HEX(est_id_ran), 9, 4), "-", MID(HEX(est_id_ran), 13, 4), "-", MID(HEX(est_id_ran), 17, 4), "-", RIGHT(HEX(est_id_ran), 12))) AS est_id_ran FROM rango WHERE ran_nombre = ?;',
        [nombre]
      )

      return rank[0] || null
    } catch (error) {
      console.error('Error al obtener el rango por nombre:', error)
      throw new Error('Error al obtener el rango por nombre')
    }
  }

  static async updateStateById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE rango SET est_id_ran = UNHEX(REPLACE(?, "-", "")) WHERE ran_id = UNHEX(REPLACE(?, "-", ""));',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar el rango por id:', error)
      throw new Error('Error al actualizar el rango por id')
    }
  }

  static async findRankById({ id }) {
    try {
      const [rank] = await connection.query(
        'SELECT estados.est_nombre AS est_id_ran FROM rango INNER JOIN estados ON rango.est_id_ran = estados.est_id WHERE ran_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return rank[0] || null
    } catch (error) {
      console.error('Error al obtener el rango por id:', error)
      throw new Error('Error al obtener el rango por id')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(
        'DELETE FROM rango WHERE ran_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )
    } catch (error) {
      console.error('Error al eliminar el rango por id:', error)
      throw new Error('Error al eliminar el rango por id')
    }
  }

  static async getRanks() {
    try {
      const [ranks] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(ran_id), 8), "-", MID(HEX(ran_id), 9, 4), "-", MID(HEX(ran_id), 13, 4), "-", MID(HEX(ran_id), 17, 4), "-", RIGHT(HEX(ran_id), 12))) AS id, ran_nombre, estados.est_nombre AS est_id_ran FROM rango INNER JOIN estados ON rango.est_id_ran = estados.est_id;'
      )

      return ranks
    } catch (error) {
      console.error('Error al obtener los rangos:', error)
      throw new Error('Error al obtener los rangos')
    }
  }
}
