import cron from 'node-cron'
import { connection } from '../config/db.js'

async function updateStatesServices() {
  try {
    await connection.query('CALL actualizar_estados_servicio()')
  } catch (error) {
    console.error(
      'Error al actualizar los estados de los servicios:',
      error.message
    )
  }
}

cron.schedule('0 0 * * *', () => {
  updateStatesServices()
})
