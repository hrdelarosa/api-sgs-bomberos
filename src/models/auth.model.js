import { connection } from '../db.js'
import bcrypt from 'bcrypt'
import { throwError } from '../lib/errors.js'
import crypto from 'node:crypto'

export class AuthModel {
  static async crear({ input, rol, estado }) {
    const { nombres, apellidos, correo, contraseña } = input
    const hashedPassword = await bcrypt.hash(contraseña, 10)
    const tokenVerifi = crypto
      .randomBytes(16)
      .toString('hex')
      .match(/.{1,8}/g)
      .join('-')
    const tokenExpiryDate = new Date(Date.now() + 1800000) // 30 minutos de caducidad

    try {
      await connection.query(
        'INSERT INTO usuarios (us_nombres, us_apellidos, us_correo, us_contraseña, rol_id_us, est_id_us, us_tokenVerificacion, us_tokenVerificacionExpiracion) VALUES (?, ?, ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?);',
        [
          nombres,
          apellidos,
          correo,
          hashedPassword,
          rol.id,
          estado.id,
          tokenVerifi,
          tokenExpiryDate,
        ]
      )

      return tokenVerifi
    } catch (error) {
      console.log(error)

      throwError('Error al crear un nuevo usuario', error)
    }
  }

  static async verificarCorreo({ token }) {
    try {
      await connection.query(
        'UPDATE usuarios SET us_verificado = true, us_tokenVerificacion = NULL, us_tokenVerificacionExpiracion = NULL WHERE us_tokenVerificacion = ? AND us_tokenVerificacionExpiracion > NOW();',
        [token]
      )
    } catch (error) {
      throwError('Error al verificar el correo electronico del usuario', error)
    }
  }

  static async actualizarTokenVerificacion({ correo, token }) {
    const tokenExpiryDate = new Date(Date.now() + 1800000) // 30 minutos de caducidad

    try {
      await connection.query(
        'UPDATE usuarios SET us_tokenVerificacion = ?, us_tokenVerificacionExpiracion = ? WHERE us_correo = ? AND us_verificado = false;',
        [token, tokenExpiryDate, correo]
      )
    } catch (error) {
      throwError('Error al actualizar el token de verificación', error)
    }
  }

  static async actualizarContraseña({ correo, contraseña }) {
    const hashedPassword = await bcrypt.hash(contraseña, 10)

    try {
      await connection.query(
        'UPDATE usuarios SET us_contraseña = ? WHERE us_correo = ? AND us_verificado = true;',
        [hashedPassword, correo]
      )
    } catch (error) {
      throwError('Error al actualizar la contraseña del usuario', error)
    }
  }

  static async obtenerPorCorreo({ correo }) {
    try {
      const [usuario] = await connection.query(
        'SELECT BIN_TO_UUID(us_id) AS id, us_nombres, us_apellidos, us_correo, us_contraseña, roles.rol_nombre, estados.est_nombre, us_verificado, us_tokenVerificacion, us_restablecerToken, us_restablecerTokenExpiracion FROM usuarios INNER JOIN roles ON usuarios.rol_id_us = roles.rol_id INNER JOIN estados ON usuarios.est_id_us = estados.est_id WHERE us_correo = ?;',
        [correo]
      )

      return usuario[0] || null
    } catch (error) {
      throwError('Error al obtener el usuario por el correo', error)
    }
  }

  static async obtenerPerfil({ id }) {
    try {
      const [perfil] = await connection.query(
        'SELECT BIN_TO_UUID(us_id) as id, us_nombres, us_apellidos, us_correo, roles.rol_nombre, estados.est_nombre, us_creado, us_actualizacion, us_verificado, COUNT(ser_id) as servicios_creados FROM usuarios JOIN roles ON usuarios.rol_id_us = roles.rol_id JOIN estados ON usuarios.est_id_us = estados.est_id LEFT JOIN servicio ON usuarios.us_id = servicio.us_id_ser WHERE us_id = UUID_TO_BIN(?) GROUP BY us_id, us_nombres, us_apellidos, us_correo, roles.rol_nombre, estados.est_nombre, us_creado, us_actualizacion, us_verificado;',
        [id]
      )

      return perfil[0] || null
    } catch (error) {
      throwError('Error al obtener el usuario', error)
    }
  }

  static async obtenerPorId({ id }) {
    try {
      const [usuario] = await connection.query(
        'SELECT BIN_TO_UUID(us_id) id, us_nombres, us_apellidos, us_correo, roles.rol_nombre, estados.est_nombre, us_creado, us_actualizacion, us_verificado FROM Usuarios JOIN roles ON usuarios.rol_id_us = roles.rol_id JOIN estados ON usuarios.est_id_us = estados.est_id WHERE us_id = UUID_TO_BIN(?);',
        [id]
      )

      return usuario[0] || null
    } catch (error) {
      throwError('Error al obtener el usuario por el id', error)
    }
  }

  static async findByResetToken({ token }) {
    try {
      const [usuario] = await connection.query(
        'SELECT * FROM usuarios WHERE us_restablecerToken = ? AND us_restablecerTokenExpiracion > NOW();',
        [token]
      )

      return usuario[0] || null
    } catch (error) {
      throwError('Error al obtener al usuario por el token', error)
    }
  }

  static async saveResetToken({ correo, token }) {
    const expiryDate = new Date(Date.now() + 3600000)

    try {
      await connection.execute(
        'UPDATE usuarios SET us_restablecerToken = ?, us_restablecerTokenExpiracion = ? WHERE us_correo = ? AND us_verificado = true;',
        [token, expiryDate, correo]
      )
    } catch (error) {
      throwError('Error al encontrar el token', error)
    }
  }

  static async obtenerPorTokenVerificacion({ token }) {
    try {
      const [usuario] = await connection.query(
        'SELECT * FROM usuarios WHERE us_tokenVerificacion = ? AND us_tokenVerificacionExpiracion > NOW();',
        [token]
      )

      return usuario[0] || null
    } catch (error) {
      throwError(
        'Error al obtener el usuario por el token de verificación',
        error
      )
    }
  }
}
