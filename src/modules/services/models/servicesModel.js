import { connection } from '../../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export class ServicesModel {
  static async create({
    usuario,
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
  }) {
    const id = uuidv4()

    try {
      await connection.query(
        `INSERT INTO servicio (ser_id, us_id_ser, ser_creado, ser_nombre, ser_telefono, ser_salida, ser_llegada, ser_control, ser_base, ser_incidente, ser_ubicacion, ser_folio, ser_otro, ser_observaciones, estser_id_ser) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT estser_id FROM estadosservicio WHERE estser_nombre = 'nuevo' LIMIT 1));`,
        [
          id,
          usuario,
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
      console.error('Error al crear un nuevo servicio:', error)
      throw new Error('Error al crear un nuevo servicio')
    }
  }

  static async delete({ id }) {
    try {
      const [result] = await connection.query('CALL sp_eliminar_servicio(?)', [
        id,
      ])

      return result
    } catch (error) {
      console.error('Error al eliminar el servicio por id:', error)
      throw new Error('Error al eliminar el servicio por id')
    }
  }

  static async findServiceById({ id }) {
    try {
      const [service] = await connection.query(
        'SELECT BIN_TO_UUID(ser_id) as id, ser_creado, estadosservicio.estser_nombre AS estser_id_ser FROM servicio INNER JOIN estadosservicio ON servicio.estser_id_ser = estadosservicio.estser_id WHERE ser_id = UUID_TO_BIN(?);',
        [id]
      )

      return service[0] || null
    } catch (error) {
      console.error('Error al obtener el servicio por id:', error)
      throw new Error('Error al obtener el servicio por id')
    }
  }

  static async getServices({ limit, offset }) {
    try {
      const [service] = await connection.query(
        'SELECT BIN_TO_UUID(ser_id) AS id, usuarios.us_nombres, ser_creado, ser_nombre, ser_telefono, ser_incidente, ser_ubicacion, ser_folio, ser_observaciones, estadosservicio.estser_nombre AS estser_id_ser FROM servicio INNER JOIN usuarios ON servicio.us_id_ser = usuarios.us_id INNER JOIN estadosservicio ON servicio.estser_id_ser = estadosservicio.estser_id ORDER BY ser_creado DESC LIMIT ? OFFSET ?;',
        [limit, offset]
      )

      return service
    } catch (error) {
      console.error('Error al obtener los servicios:', error)
      throw new Error('Error al obtener los servicios')
    }
  }

  static async getTotalServices() {
    try {
      const [count] = await connection.query(
        'SELECT COUNT(*) AS count FROM servicio;'
      )

      return count[0].count
    } catch (error) {
      console.error('Error al obtener el total de los servicios:', error)
      throw new Error('Error al obtener el total de los servicios')
    }
  }

  static async getServiceById({ id }) {
    try {
      const [service] = await connection.query(
        'SELECT * FROM vista_servicios_completa WHERE id_servicio = ?;',
        [id]
      )

      return service[0] || null
    } catch (error) {
      console.error('Error al obtener el servicio completo por id:', error)
      throw new Error('Error al obtener el servicio completo por id')
    }
  }

  static async getServiceByCreator({ id, limit }) {
    try {
      const [service] = await connection.query(
        'SELECT BIN_TO_UUID(ser_id) AS id, usuarios.us_nombres, ser_creado, ser_nombre, ser_telefono, ser_incidente, ser_ubicacion, ser_folio, ser_observaciones, estadosservicio.estser_nombre AS estser_id_ser FROM servicio INNER JOIN usuarios ON servicio.us_id_ser = usuarios.us_id INNER JOIN estadosservicio ON servicio.estser_id_ser = estadosservicio.estser_id WHERE us_id_ser = UUID_TO_BIN(?) ORDER BY ser_creado DESC LIMIT ?;',
        [id, limit]
      )

      return service
    } catch (error) {
      console.error('Error al obtener el servicio completo por id:', error)
      throw new Error('Error al obtener el servicio completo por id')
    }
  }

  static async insertServicePersonnel({ id, persona }) {
    try {
      await connection.query(
        'INSERT INTO servicio_personal (sp_servicio_id, sp_personal_id) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));',
        [id, persona]
      )
    } catch (error) {
      console.error('Error al insertar el personal al servicio:', error)
      throw new Error('Error al insertar el personal al servicio')
    }
  }

  static async insertServiceUnits({ id, unidad }) {
    try {
      await connection.query(
        'INSERT INTO servicio_unidades (su_servicio_id, su_unidades_id) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));',
        [id, unidad]
      )
    } catch (error) {
      console.error('Error al insertar la unidad al servicio:', error)
      throw new Error('Error al insertar la unidad al servicio')
    }
  }

  static async insertFireInsidente({ incendio, id }) {
    try {
      const { inmueble, inmEspecifique, otro, otrEspecifique } = incendio

      await connection.query(
        'INSERT INTO incendio (inc_id, inc_inmueble, inc_inmEspecifique, inc_otro, inc_otrEspecifique, ser_id_inc) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, UUID_TO_BIN(?));',
        [inmueble, inmEspecifique, otro, otrEspecifique, id]
      )
    } catch (error) {
      console.error(
        'Error al insertar el incidente de incendio al servicio:',
        error
      )
      throw new Error('Error al insertar el incidente de incendio al servicio')
    }
  }

  static async insertLeakageInsidente({ fugaDerrame, id }) {
    try {
      const {
        fuga,
        capacidad,
        especifique,
        empresa,
        noGuia,
        material,
        observaciones,
      } = fugaDerrame

      await connection.query(
        'INSERT INTO fugaderrame (fd_id, fd_fuga, fd_capacidad, fd_especifique, fd_empresa, fd_noGuia, fd_material, fd_observaciones, ser_id_fd) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));',
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
      console.error(
        'Error al insertar el incidente de fuga derrame al servicio:',
        error
      )
      throw new Error(
        'Error al insertar el incidente de fuga derrame al servicio'
      )
    }
  }

  static async insertBeesInsidente({ abejas, id }) {
    try {
      const { abeja, especifique, observaciones } = abejas

      await connection.query(
        'INSERT INTO abejas (ab_id, ab_abejas, ab_especifique, ab_observaciones, ser_id_ab) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, UUID_TO_BIN(?));',
        [abeja, especifique, observaciones, id]
      )
    } catch (error) {
      console.error(
        'Error al insertar el incidente de abejas al servicio:',
        error
      )
      throw new Error('Error al insertar el incidente de abejas al servicio')
    }
  }

  static async insertRescueInsidente({ rescate, id }) {
    try {
      const {
        heridos,
        cadaveres,
        ambulancia,
        equipo,
        noPersonal,
        especifique,
      } = rescate

      await connection.query(
        'INSERT INTO rescate (res_id, res_heridos, res_cadaveres, res_ambulancia, res_equipo, res_noPersonal, res_especifique, ser_id_res) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));',
        [heridos, cadaveres, ambulancia, equipo, noPersonal, especifique, id]
      )
    } catch (error) {
      console.error(
        'Error al insertar el incidente de rescate al servicio:',
        error
      )
      throw new Error('Error al insertar el incidente de rescate al servicio')
    }
  }

  static async insertDamageInsidente({ daños, id }) {
    try {
      const { material, especifique, heridos, muertos, ambulancia } = daños

      await connection.query(
        'INSERT INTO daños (da_id, da_material, da_especifique, da_heridos, da_muertos, da_ambulancia, ser_id_da) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, UUID_TO_BIN(?));',
        [material, especifique, heridos, muertos, ambulancia, id]
      )
    } catch (error) {
      console.error('Error al insertar los daños del servicio:', error)
      throw new Error('Error al insertar los daños del servicio')
    }
  }

  static async insertLegalInsidente({ legales, id }) {
    const { legal, otro } = legales
    try {
      await connection.query(
        'INSERT INTO legales (le_id, le_legales, le_otro, ser_id_le) VALUES (UUID_TO_BIN(UUID()), ?, ?, UUID_TO_BIN(?));',
        [legal, otro, id]
      )
    } catch (error) {
      console.error('Error al insertar los datos legales al servicio:', error)
      throw new Error('Error al insertar los datos legales al servicio')
    }
  }
}
