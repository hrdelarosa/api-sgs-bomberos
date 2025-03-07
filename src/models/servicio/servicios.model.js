import { connection } from '../../db.js'
import { throwError } from '../../lib/errors.js'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export class ServiciosModel {
  // Servicio
  static async insertarServicio({ input, folio }) {
    const id = uuidv4()
    const fecha = dayjs().format('YYYY-MM-DD')
    const {
      creado,
      nombre,
      telefono,
      salida,
      llegada,
      control,
      base,
      incidente,
      ubicacion,
      otro,
      observaciones,
    } = input

    try {
      await connection.query(
        'INSERT INTO servicio (ser_id, us_id_ser, ser_creado, ser_nombre, ser_telefono, ser_salida, ser_llegada, ser_control, ser_base, ser_incidente, ser_ubicacion, ser_folio, ser_otro, ser_observaciones) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [
          id,
          creado,
          fecha,
          nombre,
          telefono,
          salida,
          llegada,
          control,
          base,
          incidente,
          ubicacion,
          folio,
          otro,
          observaciones,
        ]
      )

      return id
    } catch (error) {
      throwError('Error al insertar los datos del servicio', error)
    }
  }

  static async borrarServicio({ id }) {
    try {
      await connection.query(
        'DELETE FROM servicio WHERE ser_id = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar los datos del servicio', error)
    }
  }

  static async obtener() {
    try {
      const [servicios] = await connection.query(
        'SELECT BIN_TO_UUID(ser_id) AS id, usuarios.us_nombres, ser_creado, ser_nombre, ser_telefono, ser_incidente, ser_ubicacion, ser_folio, ser_observaciones FROM servicio INNER JOIN usuarios ON servicio.us_id_ser = usuarios.us_id ORDER BY ser_creado DESC;'
      )

      return servicios
    } catch (error) {
      throwError('Error al obtener todos los servicio', error)
    }
  }

  static async obtenerPorId({ id }) {
    try {
      const [servicio] = await connection.query(
        'SELECT * FROM vw_servicios_completo WHERE id_servicio = ?;',
        [id]
      )

      return servicio[0] || null
    } catch (error) {
      console.log(error)
      throwError('Error al obtener el servicio', error)
    }
  }

  static async obtenerPorCreador({ id }) {
    try {
      const [servicios] = await connection.query(
        'SELECT BIN_TO_UUID(ser_id) as id, ser_creado, ser_nombre, ser_telefono, ser_incidente, ser_folio, ser_ubicacion, ser_salida, ser_llegada, ser_control, ser_base, ser_observaciones FROM Servicio WHERE us_id_ser = UUID_TO_BIN(?) ORDER BY ser_creado DESC LIMIT 3;',
        [id]
      )

      return servicios
    } catch (error) {
      throwError('Error al obtener el servicio', error)
    }
  }

  // Personal
  static async insertarPersonal({ id, idPersonal }) {
    try {
      await connection.query(
        'INSERT INTO servicio_personal (sp_servicio_id, sp_personal_id) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?));',
        [id, idPersonal]
      )
    } catch (error) {
      console.log(error)
      throwError(
        'Error al insertar el personal involucrado en el servicio',
        error
      )
    }
  }

  static async borrarPersonal({ id }) {
    try {
      await connection.query(
        'DELETE FROM servicio_personal WHERE sp_servicio_id = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError(
        'Error al borrar el personal involucrado en el servicio',
        error
      )
    }
  }

  // Unidades
  static async insertarUnidades({ id, idUnidad }) {
    try {
      await connection.query(
        'INSERT INTO servicio_unidades (su_servicio_id, su_unidades_id) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));',
        [id, idUnidad]
      )
    } catch (error) {
      throwError(
        'Error al insertar la unidad involucrada en el servicio',
        error
      )
    }
  }

  static async borrarUnidades({ id }) {
    try {
      await connection.query(
        'DELETE FROM servicio_unidades WHERE su_servicio_id = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar la unidad involucrada en el servicio', error)
    }
  }

  // Daños
  static async insertarDaños({ input, id }) {
    const { material, especifique, heridos, muertos, ambulancia } = input

    try {
      await connection.query(
        'INSERT INTO daños (da_material, da_especifique, da_heridos, da_muertos, da_ambulancia, ser_id_da) VALUES (?, ?, ?, ?, ?, UUID_TO_BIN(?));',
        [material, especifique, heridos, muertos, ambulancia, id]
      )
    } catch (error) {
      throwError('Error al insertar los datos de los daños', error)
    }
  }

  static async borrarDaños({ id }) {
    try {
      await connection.query(
        'DELETE FROM daños WHERE ser_id_da = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar los datos de los daños', error)
    }
  }

  // Legales
  static async insertarLegales({ input, id }) {
    const { legales, otro } = input

    try {
      await connection.query(
        'INSERT INTO legales (le_legales, le_otro, ser_id_le) VALUES (?, ?, UUID_TO_BIN(?));',
        [legales, otro, id]
      )
    } catch (error) {
      throwError('Error al insertar los datos de los legales', error)
    }
  }

  static async borrarLegales({ id }) {
    try {
      await connection.query(
        'DELETE FROM legales WHERE ser_id_le = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar los datos de los legales', error)
    }
  }
}
