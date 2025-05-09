import { connection } from '../../../config/db.js'

export class UnitsModel {
  static async create({ tipo, numero }) {
    try {
      await connection.query(
        `INSERT INTO unidades (tu_id_uni, uni_numero, est_id_uni) VALUES (?, ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
        [tipo, numero]
      )
    } catch (error) {
      console.error('Error al crear una nueva unidad:', error)
      throw new Error('Error al crear una nueva unidad')
    }
  }

  static async findUnitByNumber({ numero }) {
    try {
      const [unit] = await connection.query(
        'SELECT uni_numero FROM unidades WHERE uni_numero = ?;',
        [numero]
      )

      return unit[0] || null
    } catch (error) {
      console.error('Error al obtener la unidad por numero:', error)
      throw new Error('Error al obtener la unidad por numero')
    }
  }

  static async updateStatusById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE unidades SET est_id_uni = ? WHERE uni_id = ?;',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar la unidad por id:', error)
      throw new Error('Error al actualizar la unidad por id')
    }
  }

  static async findUnitByid({ id }) {
    try {
      const [unit] = await connection.query(
        'SELECT est_id_uni, estados.est_nombre FROM unidades INNER JOIN estados ON unidades.est_id_uni = estados.est_id WHERE uni_id = ?;',
        [id]
      )

      return unit[0] || null
    } catch (error) {
      console.error('Error al obtener la unidad por id:', error)
      throw new Error('Error al obtener la unidad por id')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM unidades WHERE uni_id = ?;', [id])
    } catch (error) {
      console.error('Error al eliminar la unidad por id:', error)
      throw new Error('Error al eliminar la unidad por id')
    }
  }

  static async unitsRelatedService({ id }) {
    try {
      const countUnits = await connection.query(
        'SELECT COUNT(*) AS count FROM servicio_unidades WHERE su_unidades_id = ?;',
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

  static async getUnits() {
    try {
      const [units] = await connection.query(
        'SELECT uni_id, tu_id_uni, tipounidad.tu_nombre, uni_numero, est_id_uni, estados.est_nombre FROM unidades INNER JOIN tipounidad ON unidades.tu_id_uni = tipounidad.tu_id INNER JOIN estados ON unidades.est_id_uni = estados.est_id;'
      )

      return units
    } catch (error) {
      console.error('Error al obtener las unidades:', error)
      throw new Error('Error al obtener las unidades')
    }
  }
}
