import { connection } from '../../../config/db.js'

export class RanksModel {
  static async create({ nombre }) {
    try {
      await connection.query(
        `INSERT INTO rango (ran_nombre, est_id_ran) VALUES (?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
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
        'SELECT * FROM rango WHERE ran_nombre = ?;',
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
        'UPDATE rango SET est_id_ran = ? WHERE ran_id = ?;',
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
        'SELECT est_id_ran, estados.est_nombre FROM rango INNER JOIN estados ON rango.est_id_ran = estados.est_id WHERE ran_id = ?;',
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
      await connection.query('DELETE FROM rango WHERE ran_id = ?;', [id])
    } catch (error) {
      console.error('Error al eliminar el rango por id:', error)
      throw new Error('Error al eliminar el rango por id')
    }
  }

  static async getRanks() {
    try {
      const [ranks] = await connection.query(
        'SELECT ran_id, ran_nombre, est_id_ran, estados.est_nombre FROM rango INNER JOIN estados on rango.est_id_ran = estados.est_id;'
      )

      return ranks
    } catch (error) {
      console.error('Error al obtener los rangos:', error)
      throw new Error('Error al obtener los rangos')
    }
  }
}
