import { connection } from '../../../config/db.js'

export class StationsModel {
  static async create({ nombre, ubicacion }) {
    try {
      await connection.query(
        `INSERT INTO estaciones (et_id, et_nombre, et_ubicacion, est_id_et) VALUES (UNHEX(REPLACE(UUID(), '-', '')), ?, ?, (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1));`,
        [nombre, ubicacion]
      )
    } catch (error) {
      console.error('Error al crear una nueva estación:', error)
      throw new Error('Error al crear una nueva estación')
    }
  }

  static async findStationByName({ nombre }) {
    try {
      const [station] = await connection.query(
        'SELECT * FROM estaciones WHERE et_nombre = ?;',
        [nombre]
      )

      return station[0] || null
    } catch (error) {
      console.error('Error al obtener la estación por nombre:', error)
      throw new Error('Error al obtener la estación por nombre')
    }
  }

  static async findStationById({ id }) {
    try {
      const [station] = await connection.query(
        'SELECT estados.est_nombre AS est_id_et FROM estaciones INNER JOIN estados ON estaciones.est_id_et = estados.est_id WHERE et_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return station[0] || null
    } catch (error) {
      console.error('Error al obtener la estación por id:', error)
      throw new Error('Error al obtener la estación por id')
    }
  }

  static async updateStatusById({ estado, id }) {
    try {
      await connection.query(
        'UPDATE estaciones SET est_id_et = UNHEX(REPLACE(?, "-", "")) WHERE et_id = UNHEX(REPLACE(?, "-", ""));',
        [estado, id]
      )
    } catch (error) {
      console.error('Error al actualizar la estación por id:', error)
      throw new Error('Error al actualizar la estación por id')
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(
        'DELETE FROM estaciones WHERE et_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )
    } catch (error) {
      console.error('Error al eliminar la estación por id:', error)
      throw new Error('Error al eliminar la estación por id')
    }
  }

  static async estationRelatedGuard({ id }) {
    try {
      const [countUnits] = await connection.query(
        'SELECT COUNT(*) as count FROM guardia WHERE et_id_gu = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return countUnits[0].count
    } catch (error) {
      console.error(
        'Error al obtener las guardias relacionadas con la estación:',
        error
      )
      throw new Error(
        'Error al obtener las guardias relacionadas con la estación'
      )
    }
  }

  static async getStations() {
    try {
      const [stations] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(et_id), 8), "-", MID(HEX(et_id), 9, 4), "-", MID(HEX(et_id), 13, 4), "-", MID(HEX(et_id), 17, 4), "-", RIGHT(HEX(et_id), 12))) AS id, et_nombre, et_ubicacion, estados.est_nombre AS est_id_et FROM estaciones INNER JOIN estados ON estaciones.est_id_et = estados.est_id;'
      )

      return stations
    } catch (error) {
      console.error('Error al obtener las estaciones:', error)
      throw new Error('Error al obtener las estaciones')
    }
  }
}
