import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { crearAccesToken } from '../lib/jwt.js'
import { refrescarAccesToken } from '../lib/refrescarToken.js'
import { EnvConfig } from '../config/env.config.js'
import { RolesModel } from '../models/roles.model.js'
import { EstadosModel } from '../models/estados.model.js'
import { transporter } from '../healps/mailer.js'

export class AuthController {
  constructor({ authModel }) {
    this.authModel = authModel
  }

  register = async (req, res) => {
    try {
      const existUsuario = await this.authModel.obtenerPorCorreo({
        input: req.body,
      })

      const rol = await RolesModel.obtenerPorNombre({ nombre: 'usuario' })
      if (!rol) return res.status(400).json({ message: 'Rol no encontrado' })

      const estado = await EstadosModel.obtenerPorNombre({
        nombre: 'activo',
      })
      if (!estado)
        return res.status(400).json({ message: 'Estado no encontrado' })

      if (existUsuario)
        return res.status(400).json({ message: 'El correo ya está en uso' })

      const tokenVerifi = await this.authModel.crear({
        input: req.body,
        rol,
        estado,
      })

      await this.sendVerificationEmail({
        correo: req.body.correo,
        token: tokenVerifi,
      })

      res.status(201).json({
        message:
          'El resgistro del usuario ha sido exitoso. Por favor verifica tu correo electrónico',
      })
    } catch (error) {
      res.status(500).json({
        message: `Error en el registro del usuario: ${error.message}`,
      })
    }
  }

  login = async (req, res) => {
    const { correo, contraseña } = req.body

    try {
      const usuarioEncontrado = await this.authModel.obtenerPorCorreo({
        correo,
      })

      if (!usuarioEncontrado || !usuarioEncontrado.us_verificado)
        return res
          .status(401)
          .json({ message: 'Correo no verificado o credenciales inválidas' })

      if (usuarioEncontrado.est_nombre === 'inactivo')
        return res.status(403).json({
          message:
            'Tu cuenta está pendiente de validación por un administrador',
        })

      const isMatch = await bcrypt.compare(
        contraseña,
        usuarioEncontrado.us_contraseña
      )

      if (!isMatch)
        return res.status(401).json({ message: 'Credenciales inválidas' })

      const token = await crearAccesToken({
        id: usuarioEncontrado.id,
        us_correo: usuarioEncontrado.us_correo,
        rol_nombre: usuarioEncontrado.rol_nombre,
      })
      res.cookie('token', token)

      delete usuarioEncontrado.us_contraseña

      res.status(200).json({
        message: 'Inicio de sesión ha sido exitoso',
        data: usuarioEncontrado,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al querer iniciar sesión: ${error.message}`,
      })
    }
  }

  logout = async (req, res) => {
    res.cookie('token', '', {
      expires: new Date(0),
    })

    return res.sendStatus(200)
  }

  profile = async (req, res) => {
    const { id } = req.params

    try {
      const usuario = await this.authModel.obtenerPerfil({ id })

      if (!usuario)
        return res.status(400).json({ error: 'Usuario no encontrado' })

      return res.status(200).json({
        message: 'Se ha obtenido el usuario correctamente',
        data: usuario,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener el usuario: ${error.message}`,
      })
    }
  }

  profileSettings = async (req, res) => {
    const { id } = req.params

    try {
      const usuario = await this.authModel.obtenerPorId({ id })

      if (!usuario)
        return res.status(400).json({ error: 'Usuario no encontrado' })

      return res.status(200).json({
        message: 'Se ha obtenido el usuario correctamente',
        data: usuario,
      })
    } catch (error) {
      res.status(500).json({
        message: `Error al obtener el usuario: ${error.message}`,
      })
    }
  }

  verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'Sin autorización' })

    jwt.verify(token, EnvConfig().jwt_secret, async (err, usuario) => {
      if (err) return res.status(401).json({ message: 'Sin autorización' })

      const usuarioEncontrado = await this.authModel.obtenerPorId({
        id: usuario.id,
      })
      if (!usuarioEncontrado)
        return res.status(401).json({ message: 'Sin autorización' })

      return res.status(200).json({
        message: 'Autorizado',
        data: usuarioEncontrado,
      })
    })
  }

  refreshToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' })
    }

    try {
      const newToken = await refrescarAccesToken(token)
      res.cookie('token', newToken)
      res.status(200).json({ message: 'Token refrescado exitosamente' })
    } catch (error) {
      res.status(500).json({
        message: `Error al refrescar el token: ${error.message}`,
      })
    }
  }

  verifyEmail = async (req, res) => {
    const { token } = req.body

    try {
      const usuario = await this.authModel.obtenerPorTokenVerificacion({
        token,
      })

      if (!usuario)
        return res
          .status(400)
          .json({ message: 'Código de verificación inválido o no existe' })

      await this.authModel.verificarCorreo({ token })

      res.status(200).json({ message: 'Correo verificado exitosamente' })
    } catch (error) {
      res.status(500).json({
        message: `Error al verificar el correo: ${error.message}`,
      })
    }
  }

  resendVerificationEmail = async (req, res) => {
    const { correo } = req.body

    try {
      const usuario = await this.authModel.obtenerPorCorreo({ correo })

      if (!usuario || usuario.us_verificado)
        return res
          .status(400)
          .json({ message: 'Correo no encontrado o ya verificado' })

      const newToken = crypto
        .randomBytes(16)
        .toString('hex')
        .match(/.{1,8}/g)
        .join('-')
      await this.authModel.actualizarTokenVerificacion({
        correo,
        token: newToken,
      })

      await this.sendVerificationEmail({ correo, token: newToken })

      res.status(200).json({ message: 'Nuevo correo de verificación enviado' })
    } catch (error) {
      res.status(500).json({
        message: `Error al reenviar el correo de verificación: ${error.message}`,
      })
    }
  }

  requestPasswordReset = async (req, res) => {
    const { correo } = req.body

    try {
      const usuario = await this.authModel.obtenerPorCorreo({ correo })

      if (!usuario || !usuario.us_verificado)
        return res
          .status(404)
          .json({ message: 'Correo no encontrado o no verificado' })

      const resetToken = crypto
        .randomBytes(16)
        .toString('hex')
        .match(/.{1,8}/g)
        .join('-')

      await this.authModel.saveResetToken({ correo, token: resetToken })

      await this.sendPasswordResetEmail({ correo, token: resetToken })

      res.status(200).json({ message: 'Instrucciones enviadas al correo' })
    } catch (error) {
      res.status(500).json({
        message: `Error al solicitar cambio de contraseña: ${error.message}`,
      })
    }
  }

  resetPassword = async (req, res) => {
    const { token } = req.body
    const { contraseña } = req.body

    try {
      const usuario = await this.authModel.findByResetToken({ token })

      if (!usuario || !usuario.us_verificado)
        return res.status(400).json({ message: 'Token inválido o expirado' })

      await this.authModel.actualizarContraseña({
        correo: usuario.us_correo,
        contraseña,
      })

      res.status(200).json({ message: 'Contraseña actualizada exitosamente' })
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al cambiar la contraseña: ${error.message}` })
    }
  }

  sendVerificationEmail = async ({ correo, token }) => {
    await transporter.sendMail({
      from: EnvConfig().email_user,
      to: correo,
      subject: 'Verifica tu correo electrónico para el Sistema de Bomberos',
      html: `
        <h2>Gracias por registrarte</h2>
        <p>Para confirmar tu <b>cuenta</b>, necesitamos verificar tu dirección de correo electrónico</p>
        <p>Código de verificación: <b>${token}</b><br/>Puedes copiar este código y, una vez en la página, ingresarlo para completar el proceso.</p>
        <p>Puedes hacer clic en el siguiente enlace para poder ingresar el código y validar tu correo:</p>
        <p><a href="${
          EnvConfig().app_url
        }/verify-email">Ir a verificar mi cuenta</a></p>
        <strong>Nota: El código es válido por 30 minutos. Si no solicitaste este registro, por favor ignora este mensaje.</strong>
      `,
    })
  }

  sendPasswordResetEmail = async ({ correo, token }) => {
    await transporter.sendMail({
      from: EnvConfig().email_user,
      to: correo,
      subject: 'Restablecer tu contraseña en el Sistema de Bomberos',
      html: `
        <h2>Restablece tu contraseña</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña en Sistema de Bomberos. Si no realizaste esta solicitud, puedes ignorar este correo.</p>
        <p>Código para restablecer contraseña: <b>${token}</b><br/>Copiar este código y, una vez en la página, ingresarlo para completar el proceso.</p>
        <p>Haz clic en el siguiente enlace para ingresar el código y cambiar tu contraseña:</p>
        <a href="${process.env.APP_URL}/reset-password">Ir para cambiar mi contraseña</a>
        <p><strong>Nota: El código es válido por 30 minutos. Si no solicitaste este registro, por favor ignora este mensaje.</strong></p>
      `,
    })
  }
}
