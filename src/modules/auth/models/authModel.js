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
        `INSERT INTO usuarios (us_id, us_nombres, us_apellidos, us_correo, us_contraseña, rol_id_us, est_id_us, us_tokenVerificacion, us_tokenVerificacionExpiracion) VALUES (UNHEX(REPLACE(UUID(), '-', '')), ?, ?, ?, ?, (SELECT rol_id FROM roles WHERE rol_nombre = 'usuario' LIMIT 1), (SELECT est_id FROM estados WHERE est_nombre = 'activo' LIMIT 1), ?, ?);`,
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
        'SELECT LOWER(CONCAT(LEFT(HEX(us_id), 8), "-", MID(HEX(us_id), 9, 4), "-", MID(HEX(us_id), 13, 4), "-", MID(HEX(us_id), 17, 4), "-", RIGHT(HEX(us_id), 12))) AS id, us_nombres, us_apellidos, us_correo, us_contraseña, us_verificado, estados.est_nombre AS est_id_us FROM usuarios INNER JOIN estados on usuarios.est_id_us = estados.est_id WHERE us_correo = ?;',
        [correo]
      )

      return usuario[0] || null
    } catch (error) {
      console.error('Error al buscar usuario por correo:', error)
      throw new Error('Error al buscar usuario por correo')
    }
  }

  static async findUserById({ id }) {
    try {
      const [usuario] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(us_id), 8), "-", MID(HEX(us_id), 9, 4), "-", MID(HEX(us_id), 13, 4), "-", MID(HEX(us_id), 17, 4), "-", RIGHT(HEX(us_id), 12))) AS id, us_nombres, us_apellidos, us_correo, roles.rol_nombre AS rol_id_us, estados.est_nombre AS est_id_us, us_verificado, us_creado, us_actualizacion FROM usuarios INNER JOIN roles ON usuarios.rol_id_us = roles.rol_id INNER JOIN estados ON usuarios.est_id_us = estados.est_id  WHERE us_id = UNHEX(REPLACE(?, "-", ""));',
        [id]
      )

      return usuario[0] || null
    } catch (error) {
      console.error('Error al buscar usuario por id:', error)
      throw new Error('Error al buscar usuario por id')
    }
  }

  static async getProfileById({ id }) {
    try {
      const [profile] = await connection.query(
        'SELECT LOWER(CONCAT(LEFT(HEX(us_id), 8), "-", MID(HEX(us_id), 9, 4), "-", MID(HEX(us_id), 13, 4), "-", MID(HEX(us_id), 17, 4), "-", RIGHT(HEX(us_id), 12))) as id, us_nombres, us_apellidos, us_correo, roles.rol_nombre AS rol_id_us, estados.est_nombre AS est_id_us, us_creado, us_actualizacion, us_verificado, COUNT(ser_id) as servicios_creados FROM usuarios JOIN roles ON usuarios.rol_id_us = roles.rol_id JOIN estados ON usuarios.est_id_us = estados.est_id LEFT JOIN servicio ON usuarios.us_id = servicio.us_id_ser WHERE us_id = UNHEX(REPLACE(?, "-", "")) GROUP BY us_id, us_nombres, us_apellidos, us_correo, roles.rol_nombre, estados.est_nombre, us_creado, us_actualizacion, us_verificado;',
        [id]
      )

      return profile[0] || null
    } catch (error) {
      console.error('Error al buscar usuario por id:', error)
      throw new Error('Error al buscar usuario por id')
    }
  }

  static async findUserByVerificationToken({ token }) {
    try {
      const [user] = await connection.query(
        'SELECT * FROM usuarios WHERE us_tokenVerificacion = ? AND us_tokenVerificacionExpiracion > NOW();',
        [token]
      )

      return user[0] || null
    } catch (error) {
      console.error(
        'Error al buscar usuario por el token de verificación:',
        error
      )
      throw new Error('Error al buscar usuario por el token de verificación')
    }
  }

  static async checkEmail({ token }) {
    try {
      await connection.query(
        'UPDATE usuarios SET us_verificado = true, us_tokenVerificacion = NULL, us_tokenVerificacionExpiracion = NULL WHERE us_tokenVerificacion = ? AND us_tokenVerificacionExpiracion > NOW();',
        [token]
      )
    } catch (error) {
      console.error('Error al verificar el correo del usuario:', error)
      throw new Error('Error al verificar el correo del usuario')
    }
  }

  static async updateVerificationToken({ correo }) {
    const tokenVerification = createTokenVerification()

    try {
      await connection.query(
        'UPDATE usuarios SET us_tokenVerificacion = ?, us_tokenVerificacionExpiracion = ? WHERE us_correo = ? AND us_verificado = false;',
        [tokenVerification, tokenExpiryDate(), correo]
      )

      return tokenVerification
    } catch (error) {
      console.error(
        'Error al actualizar el token de verificación del usuario:',
        error
      )
      throw new Error(
        'Error al actualizar el token de verificación del usuario'
      )
    }
  }

  static async savePasswordResetToken({ correo }) {
    const tokenVerification = createTokenVerification()

    try {
      await connection.query(
        'UPDATE usuarios SET us_restablecerToken = ?, us_restablecerTokenExpiracion = ? WHERE us_correo = ? AND us_verificado = true;',
        [tokenVerification, tokenExpiryDate(), correo]
      )

      return tokenVerification
    } catch (error) {
      console.error(
        'Error al buscar usuario por el token de restablecimineto de contraseña:',
        error
      )
      throw new Error(
        'Error al guardar el token de restablecimineto de contraseña'
      )
    }
  }

  static async findUserByResetToken({ token }) {
    try {
      const [user] = await connection.query(
        'SELECT * FROM usuarios WHERE us_restablecerToken = ? AND us_restablecerTokenExpiracion > NOW();',
        [token]
      )

      return user[0] || null
    } catch (error) {
      console.error(
        'Error al buscar usuario por el token de restablecimineto de contraseña:',
        error
      )
      throw new Error(
        'Error al buscar usuario por el token de restablecimineto de contraseña'
      )
    }
  }

  static async updatePassword({ correo, contraseña }) {
    try {
      await connection.query(
        'UPDATE usuarios SET us_contraseña = ? WHERE us_correo = ? AND us_verificado = true;',
        [await createHashPassword({ contraseña }), correo]
      )
    } catch (error) {
      console.error('Error al actualizar la contraseña del usuario:', error)
      throw new Error('Error al actualizar la contraseña del usuario')
    }
  }
}
