import mysql from 'mysql2/promise'
import { DBConfig } from './db.config.js'

async function connectDataBase() {
  try {
    const connection = await mysql.createConnection(DBConfig)
    console.log('Conexión exitosa a la base de datos')
    return connection
  } catch (error) {
    throw new Error('Error al conectar a la base de datos:', error)
  }
}

export const connection = await connectDataBase()
