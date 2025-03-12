import { transporter } from '../healps/mailer.js'
import { EnvConfig } from '../config/env.config.js'

export async function sendVerificationEmail({ correo, token }) {
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

export async function sendPasswordResetEmail({ correo, token }) {
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
