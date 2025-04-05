import { transporter } from '../healps/mailer.js'
import { EnvConfig } from '../config/env.config.js'

export async function sendVerificationEmail({ nombres, correo, token }) {
  await transporter.sendMail({
    from: EnvConfig().email_user,
    to: correo,
    subject:
      'Tu código de verificación de registro para el Sistema de Bomberos',
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 30px;">
          <div style="display: flex; justify-content: center; color: #810000;">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fire-extinguisher-icon lucide-fire-extinguisher"><path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/><path d="M9 18h8"/><path d="M18 3h-3"/><path d="M11 3a6 6 0 0 0-6 6v11"/><path d="M5 13h4"/><path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/></svg>
          </div>
          <h2 style="color: #007bff; text-align: center;">¡Gracias por registrarte!</h2>
          <p style="text-align: center; color: #810000; font-size: 14px; margin-bottom: 30px; text-decoration: none;">Hola, ${nombres} - ${correo}</p>
          <p>Para completar tu registro, necesitamos verificar tu dirección de correo electrónico.</p>
          
          <p style="margin: 0 0 8px ; font-size: 16px;">Tu código de verificación es:</p>

          <div style="background-color: #faf9fa; padding: 16px; border: 1px solid #dad8de; border-radius: 4px; text-align: center;">
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #007bff;">${token}</p>
          </div>

          <p style="margin: 8px 0 0; font-size: 14px;">Ingresa este código para completar el registro.</p>

          <p><strong>Nota:</strong> El código es válido por <b>30 minutos</b>. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>

          <p style="font-size: 12px; color: #666; text-align: center;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        </div>
      `,
  })
}

export async function sendPasswordResetEmail({ correo, token }) {
  await transporter.sendMail({
    from: EnvConfig().email_user,
    to: correo,
    subject:
      'Tu código de restablecimineto de contraseña para el Sistema de Bomberos',
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 30px;">
          <div style="display: flex; justify-content: center; color: #810000;">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fire-extinguisher">
              <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/><path d="M9 18h8"/><path d="M18 3h-3"/><path d="M11 3a6 6 0 0 0-6 6v11"/><path d="M5 13h4"/><path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>
            </svg>
          </div>

          <h2 style="color: #007bff; text-align: center;">Restablece tu contraseña</h2>
          
          <p style="text-align: center; color: #810000; font-size: 14px; margin-bottom: 30px;">Hola, ${correo}</p>

          <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>Sistema de Bomberos</strong>. Si no realizaste esta solicitud, puedes ignorar este correo.</p>

          <p style="margin: 0 0 8px; font-size: 16px;">Tu código de recuperación es:</p>

          <div style="background-color: #faf9fa; padding: 16px; border: 1px solid #dad8de; border-radius: 4px; text-align: center;">
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #007bff;">${token}</p>
          </div>

          <p style="margin: 8px 0 0; font-size: 14px;">Ingresa este código en la página de recuperación para cambiar tu contraseña.</p>

          <p><strong>Nota:</strong> El código es válido por <b>30 minutos</b>. Si no solicitaste esta acción, puedes ignorar este mensaje.</p>

          <p style="font-size: 12px; color: #666; text-align: center;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        </div>
      `,
  })
}
