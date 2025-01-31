import { connection } from '../../db.js'
import { throwError } from '../../lib/errors.js'

export class IncidentesModel {
  // Incendio
  static async insertarIncendio({ input, id }) {
    const { inmueble, inmEspecifique, otro, otrEspecifique } = input

    try {
      await connection.query(
        'INSERT INTO incendio (inc_inmueble, inc_inmEspecifique, inc_otro, inc_otrEspecifique, ser_id_inc) VALUES (?, ?, ?, ?, UUID_TO_BIN(?));',
        [inmueble, inmEspecifique, otro, otrEspecifique, id]
      )
    } catch (error) {
      throwError('Error al insertar los datos del incidente (incendio)', error)
    }
  }

  static async borrarIncendio({ id }) {
    try {
      await connection.query(
        'DELETE FROM incendio WHERE ser_id_inc = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar los datos del incidente (incendio)', error)
    }
  }

  // Fuga o Derrame
  static async insertarFuga({ input, id }) {
    const {
      fuga,
      capacidad,
      especifique,
      empresa,
      noGuia,
      material,
      observaciones,
    } = input

    try {
      await connection.query(
        'INSERT INTO fugaderrame (fd_fuga, fd_capacidad, fd_especifique, fd_empresa, fd_noGuia, fd_material, fd_observaciones, ser_id_fd) VALUES (?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));',
        [
          fuga,
          capacidad,
          especifique,
          empresa,
          noGuia,
          material,
          observaciones,
          id,
        ]
      )
    } catch (error) {
      throwError(
        'Error al insertar los datos del incidente (fuga Derrame)',
        error
      )
    }
  }

  static async borrarFuga({ id }) {
    try {
      await connection.query(
        'DELETE FROM fugaderrame WHERE ser_id_fd = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError(
        'Error al borrar los datos del incidente (fuga Derrame)',
        error
      )
    }
  }

  // Abejas
  static async insertarAbejas({ input, id }) {
    const { abejas, especifique, observaciones } = input

    try {
      await connection.query(
        'INSERT INTO abejas (ab_abejas, ab_especifique, ab_observaciones, ser_id_ab) VALUES (?, ?, ?, UUID_TO_BIN(?));',
        [abejas, especifique, observaciones, id]
      )
    } catch (error) {
      throwError('Error al insertar los datos del incidente (abejas)', error)
    }
  }

  static async borrarAbejas({ id }) {
    try {
      await connection.query(
        'DELETE FROM abejas WHERE ser_id_ab = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar los datos del incidente (abejas)', error)
    }
  }

  // Rescate
  static async insertarRescate({ input, id }) {
    const { heridos, cadaveres, ambulancia, equipo, noPersonal, especifique } =
      input

    try {
      await connection.query(
        'INSERT INTO rescate (res_heridos, res_cadaveres, res_ambulancia, res_equipo, res_noPersonal, res_especifique, ser_id_res) VALUES (?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));',
        [heridos, cadaveres, ambulancia, equipo, noPersonal, especifique, id]
      )
    } catch (error) {
      throwError('Error al insertar los datos del incidente (rescate)', error)
    }
  }

  static async borrarRescate({ id }) {
    try {
      await connection.query(
        'DELETE FROM rescate WHERE ser_id_res = UUID_TO_BIN(?);',
        [id]
      )
    } catch (error) {
      throwError('Error al borrar los datos del incidente (rescate)', error)
    }
  }
}
