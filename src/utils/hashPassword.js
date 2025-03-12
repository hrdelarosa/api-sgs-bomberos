import bcrypt from 'bcrypt'

export async function createHashPassword({ contraseña }) {
  return await bcrypt.hash(contraseña, 10)
}

export async function compareHashPassword({ contraseña, hash }) {
  return await bcrypt.compare(contraseña, hash)
}
