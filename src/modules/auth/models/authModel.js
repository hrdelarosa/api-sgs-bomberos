import { connection } from '../../../config/db.js'
import { createHashPassword } from '../../../utils/hashPassword.js'
import {
  createTokenVerification,
  tokenExpiryDate,
} from '../../../utils/createToken.js'

export class AuthModel {
  static async create({ nombres, apellidos, correo, contraseña }) {
    const tokenVerification = createTokenVerification()

    try {
      await connection.query(
        `INSERT INTO usuarios (us_id, us_nombres, us_apellidos, us_correo, us_contraseña, rol_id_us, est_id_us, us_tokenVerificacion, us_tokenVerificacionExpiracion) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, (SELECT rol_id FROM roles WHERE rol_nombre = 'usuario' LIMIT 1), (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1), ?, ?);`,
        [
          nombres,
          apellidos,
          correo,
          await createHashPassword({ contraseña }),
          tokenVerification,
          tokenExpiryDate(),
        ]
      )

      return tokenVerification
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error)
      throw new Error('Error al crear un nuevo usuario')
    }
  }

  static async findUserByEmail({ correo }) {
    try {
      const [usuario] = await connection.query(
        'SELECT BIN_TO_UUID(us_id) AS id, us_nombres, us_apellidos, us_correo, us_contraseña, us_verificado, estados.est_nombre AS est_id_us FROM usuarios INNER JOIN estados on usuarios.est_id_us = estados.est_id WHERE us_correo = ?;',
        [correo]
      )

      return usuario[0] || null
    } catch (error) {
      console.error('Error al buscar usuario por correo:', error)
      throw new Error('Error al buscar usuario por correo')
    }
  }

  static async getProfileById({ id }) {
    try {
      const [profile] = await connection.query(
        'SELECT BIN_TO_UUID(us_id) as id, us_nombres, us_apellidos, us_correo, roles.rol_nombre AS rol_id_us, estados.est_nombre AS est_id_us, us_creado, us_actualizacion, us_verificado, COUNT(ser_id) as servicios_creados FROM usuarios JOIN roles ON usuarios.rol_id_us = roles.rol_id JOIN estados ON usuarios.est_id_us = estados.est_id LEFT JOIN servicio ON usuarios.us_id = servicio.us_id_ser WHERE us_id = UUID_TO_BIN(?) GROUP BY us_id, us_nombres, us_apellidos, us_correo, roles.rol_nombre, estados.est_nombre, us_creado, us_actualizacion, us_verificado;',
        [id]
      )

      return profile[0] || null
    } catch (error) {
      console.error('Error al buscar usuario por id:', error)
      throw new Error('Error al buscar usuario por id')
    }
  }
}
