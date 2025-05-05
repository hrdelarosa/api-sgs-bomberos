import { connection } from '../../../config/db.js'

export class DashboardModel {
  static async getIncidentesPorcentaje() {
    try {
      const [result] = await connection.query(
        'SELECT ser_incidente, COUNT(*) AS total, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM servicio), 2) AS porcentaje FROM servicio GROUP BY ser_incidente;'
      )

      return result
    } catch (error) {
      console.error(
        'Error al obtener el porcentaje de los servicios por incidente:',
        error
      )
      throw new Error(
        'Error al obtener el porcentaje de los servicios por incidente'
      )
    }
  }

  static async getTotalServices() {
    try {
      const [total] = await connection.query(
        'SELECT COUNT(*) as total FROM servicio'
      )

      return total[0].total
    } catch (error) {
      console.error('Error al obtener el total de los servicios:', error)
      throw new Error('Error al obtener el total de los servicios')
    }
  }

  static async getTotalServicesIncident() {
    try {
      const [incident] = await connection.query(
        'SELECT ser_incidente as incidente, COUNT(*) as cantidad FROM servicio GROUP BY ser_incidente ORDER BY cantidad DESC'
      )

      return incident[0] || null
    } catch (error) {
      console.error(
        'Error al obtener el total de los servicios por el incidente:',
        error
      )
      throw new Error(
        'Error al obtener el total de los servicios por el incidente'
      )
    }
  }

  static async getTotalServicesCurrentMonth() {
    try {
      const [total] = await connection.query(
        'SELECT COUNT(*) as total FROM servicio WHERE MONTH(ser_creado) = MONTH(CURRENT_DATE()) AND YEAR(ser_creado) = YEAR(CURRENT_DATE())'
      )

      return total[0].total
    } catch (error) {
      console.error(
        'Error al obtener el total de los servicios del mes actual:',
        error
      )
      throw new Error(
        'Error al obtener el total de los servicios del mes actual'
      )
    }
  }

  static async getTotalServicesPreviousMonth() {
    try {
      const [total] = await connection.query(
        'SELECT COUNT(*) as total FROM servicio WHERE (MONTH(ser_creado) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(ser_creado) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)) OR (MONTH(ser_creado) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(ser_creado) = YEAR(CURRENT_DATE()))'
      )

      return total[0].total
    } catch (error) {
      console.error(
        'Error al obtener el total de los servicios del mes anterior:',
        error
      )
      throw new Error(
        'Error al obtener el total de los servicios del mes anterior'
      )
    }
  }

  static async mostFrequentIncidentCurrentMonth() {
    try {
      const [total] = await connection.query(
        'SELECT ser_incidente as incidente, COUNT(*) as cantidad FROM servicio WHERE MONTH(ser_creado) = MONTH(CURRENT_DATE()) AND YEAR(ser_creado) = YEAR(CURRENT_DATE()) GROUP BY ser_incidente ORDER BY cantidad DESC LIMIT 1'
      )

      return total[0] || null
    } catch (error) {
      console.error(
        'Error al obtener el total de los servicios mas frecuentes por el incidente del mes actual:',
        error
      )
      throw new Error(
        'Error al obtener el total de los servicios mas frecuentes por el incidente del mes actual'
      )
    }
  }

  static async mostFrequentIncidentPreviousMonth() {
    try {
      const [total] = await connection.query(
        'SELECT ser_incidente as incidente, COUNT(*) as cantidad FROM servicio WHERE (MONTH(ser_creado) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(ser_creado) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)) OR (MONTH(ser_creado) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(ser_creado) = YEAR(CURRENT_DATE())) GROUP BY ser_incidente ORDER BY cantidad DESC LIMIT 1'
      )

      return total[0] || null
    } catch (error) {
      console.error(
        'Error al obtener el total de los servicios mas frecuentes por el incidente del mes anterior:',
        error
      )
      throw new Error(
        'Error al obtener el total de los servicios mas frecuentes por el incidente del mes anterior'
      )
    }
  }

  static async getUnitTypesPorcentaje() {
    try {
      const [types] = await connection.query(
        'SELECT t.tu_nombre as tipo, COUNT(u.uni_id) as cantidad, ROUND((COUNT(u.uni_id) / (SELECT COUNT(*) FROM unidades)) * 100, 2) as porcentaje FROM tipounidad t JOIN unidades u ON t.tu_id = u.tu_id_uni GROUP BY t.tu_id ORDER BY cantidad DESC'
      )

      return types
    } catch (error) {
      console.error(
        'Error al obtener los porcentajes de los tipos de unidad:',
        error
      )
      throw new Error('Error al obtener los porcentajes de los tipos de unidad')
    }
  }

  static async getStateUnits() {
    try {
      const [units] = await connection.query(
        `SELECT t.tu_nombre as tipo, COUNT(u.uni_id) as total, SUM(CASE WHEN u.est_id_uni = (SELECT est_id FROM estados WHERE est_nombre = 'Activo') THEN 1 ELSE 0 END) as activas FROM tipounidad t JOIN unidades u ON t.tu_id = u.tu_id_uni GROUP BY t.tu_id`
      )

      return units
    } catch (error) {
      console.error('Error al obtener los estados de las unidades:', error)
      throw new Error('Error al obtener los estados de las unidades')
    }
  }

  static async getAverageResponseTime() {
    try {
      const [time] = await connection.query(
        'SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(TIMEDIFF(ser_llegada, ser_salida)))) as tiempo_respuesta FROM servicio'
      )

      return time[0] || null
    } catch (error) {
      console.error(
        'Error al calcular el tiempo de respuesta a los servicios:',
        error
      )
      throw new Error(
        'Error al calcular el tiempo de respuesta a los servicios'
      )
    }
  }

  static async getAverageControlTime() {
    try {
      const [time] = await connection.query(
        'SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(TIMEDIFF(ser_control, ser_llegada)))) as tiempo_control FROM servicio'
      )

      return time[0] || null
    } catch (error) {
      console.error(
        'Error al calcular el tiempo de control a los servicios:',
        error
      )
      throw new Error('Error al calcular el tiempo de control a los servicios')
    }
  }

  static async getOverallAverageTime() {
    try {
      const [time] = await connection.query(
        'SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(TIMEDIFF(ser_base, ser_salida)))) as tiempo_total FROM servicio'
      )

      return time[0] || null
    } catch (error) {
      console.error(
        'Error al calcular el tiempo de total a los servicios:',
        error
      )
      throw new Error('Error al calcular el tiempo de total a los servicios')
    }
  }
}
