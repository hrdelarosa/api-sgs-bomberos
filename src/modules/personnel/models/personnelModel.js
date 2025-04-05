import { connection } from '../../../config/db.js'

export class PersonnelModel {
  static async create({ nombre, apellidos, np, rango, base, guardia }) {
    try {
      await connection.query(
        `INSERT INTO personal (per_nombres, per_apellidos, per_np, ran_id_per, per_base, gu_id_per, est_id_per) VALUES (?, ?, ?, ?, ?, ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
        [nombre, apellidos, np, rango, base, guardia]
      )
    } catch (error) {
      console.error('Error al crear el nuevo personal:', error)
      throw new Error('Error al crear el nuevo personal')
    }
  }

  static async findPersonnelByNp({ np }) {
    try {
      const [person] = await connection.query(
        'SELECT per_nombres, per_apellidos, per_np FROM personal WHERE per_np = ?;',
        [np]
      )

      return person[0] || null
    } catch (error) {
      console.error('Error al obtener al personal por np:', error)
      throw new Error('Error al obtener al personal por np')
    }
  }

  static async updateStatusById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE personal SET est_id_per = ? WHERE per_id = ?;',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar el estado del personal por id:', error)
      throw new Error('Error al actualizar el estado del personal por id')
    }
  }

  static async findPersonnelById({ id }) {
    try {
      const [person] = await connection.query(
        'SELECT per_nombres, est_id_per, estados.est_nombre FROM personal LEFT JOIN estados ON personal.est_id_per = estados.est_id WHERE per_id = ?;',
        [id]
      )

      return person[0] || null
    } catch (error) {
      console.error('Error al obtener al personal por np:', error)
      throw new Error('Error al obtener al personal por np')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM personal WHERE per_id = ?;', [id])
    } catch (error) {
      console.error('Error al eliminar el personal por id:', error)
      throw new Error('Error al eliminar el personal por id')
    }
  }
  // Nota: Cambiar el enfoque ya que esta mal, seria si esta en la tabla servicio_personal
  static async personnelRelatedService({ id }) {
    try {
      const countService = await connection.query(
        'SELECT COUNT(*) AS count FROM servicio_personal WHERE sp_personal_id = ?;',
        [id]
      )

      return countService[0].count
    } catch (error) {
      console.error(
        'Error al obtener la cantidad de servicios relacionados con el personal:',
        error
      )
      throw new Error(
        'Error al obtener la cantidad de servicios relacionados con el personal'
      )
    }
  }

  static async getPersonnel() {
    try {
      const [personnel] = await connection.query(
        'SELECT per_id, per_nombres, per_apellidos, per_np, ran_id_per, rango.ran_nombre, per_base, gu_id_per, guardia.gu_nombre, est.et_nombre, per_diasEco, per_vacaciones, est_id_per, estados.est_nombre FROM personal LEFT JOIN rango ON personal.ran_id_per = rango.ran_id LEFT JOIN guardia ON personal.gu_id_per = guardia.gu_id LEFT JOIN estaciones est ON guardia.et_id_gu = est.et_id LEFT JOIN estados ON personal.est_id_per = estados.est_id ORDER BY gu_nombre ASC;'
      )

      return personnel
    } catch (error) {
      console.error('Error al obtener el personal:', error)
      throw new Error('Error al obtener el personal')
    }
  }

  static async getPersonnelPerRank({ id }) {
    try {
      const [personnel] = await connection.query(
        'SELECT per_id, per_nombres, per_apellidos, per_np, ran_id_per, rango.ran_nombre, per_base, gu_id_per, guardia.gu_nombre, est.et_nombre, per_diasEco, per_vacaciones, est_id_per, estados.est_nombre FROM personal LEFT JOIN rango ON personal.ran_id_per = rango.ran_id LEFT JOIN guardia ON personal.gu_id_per = guardia.gu_id LEFT JOIN estaciones est ON guardia.et_id_gu = est.et_id LEFT JOIN estados ON personal.est_id_per = estados.est_id WHERE ran_id_per = ? ORDER BY gu_nombre ASC;',
        [id]
      )

      return personnel
    } catch (error) {
      console.error('Error al obtener el personal por rango:', error)
      throw new Error('Error al obtener el personal por rango')
    }
  }

  static async getPersonnelPerGuard({ id }) {
    try {
      const [personnel] = await connection.query(
        'SELECT per_id, per_nombres, per_apellidos, per_np, ran_id_per, rango.ran_nombre, per_base, gu_id_per, guardia.gu_nombre, est.et_nombre, per_diasEco, per_vacaciones, est_id_per, estados.est_nombre FROM personal LEFT JOIN rango ON personal.ran_id_per = rango.ran_id LEFT JOIN guardia ON personal.gu_id_per = guardia.gu_id LEFT JOIN estaciones est ON guardia.et_id_gu = est.et_id LEFT JOIN estados ON personal.est_id_per = estados.est_id WHERE gu_id_per = ? ORDER BY gu_nombre ASC;',
        [id]
      )

      return personnel
    } catch (error) {
      console.error('Error al obtener el personal por guardia:', error)
      throw new Error('Error al obtener el personal por guardia')
    }
  }

  static async updateRankById({ rango, id }) {
    try {
      await connection.query(
        'UPDATE personal SET ran_id_per = ? WHERE per_id = ?;',
        [rango, id]
      )
    } catch (error) {
      console.error('Error al actualizar el rango del personal por id:', error)
      throw new Error('Error al actualizar el rango del personal por id')
    }
  }

  static async updateGuardById({ guardia, id }) {
    try {
      await connection.query(
        'UPDATE personal SET gu_id_per = ? WHERE per_id = ?;',
        [guardia, id]
      )
    } catch (error) {
      console.error(
        'Error al actualizar la guardia del personal por id:',
        error
      )
      throw new Error('Error al actualizar la guardia del personal por id')
    }
  }
}
