import { connection } from '../db.js'
import { throwError } from '../lib/errors.js'

export class ContadorModel {
  static async crear({ fecha, contador }) {
    try {
      await connection.query(
        'INSERT INTO foliocontador (fecha, contador) VALUES (?, ?);',
        [fecha, contador]
      )
    } catch (error) {
      throwError('Error al crear un nuevo rango', error)
    }
  }

  static async actualizar({ contador, fecha }) {
    try {
      await connection.query(
        'UPDATE foliocontador SET contador = ? WHERE fecha = ?;',
        [contador, fecha]
      )
    } catch (error) {
      throwError('Error al crear un nuevo rango', error)
    }
  }

  static async obtener({ fecha }) {
    try {
      const [contador] = await connection.query(
        'SELECT contador FROM foliocontador WHERE fecha = ?;',
        [fecha]
      )

      return contador
    } catch (error) {
      throwError('Error al obtener los datos de los legales', error)
    }
  }
}
