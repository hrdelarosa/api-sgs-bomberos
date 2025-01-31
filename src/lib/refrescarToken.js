import jwt from 'jsonwebtoken'

export function refrescarAccesToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err)
      const payload = {
        id: decoded.id,
        us_correo: decoded.us_correo,
        rol_nombre: decoded.rol_nombre,
      }
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '12h' },
        (err, newToken) => {
          if (err) reject(err)
          resolve(newToken)
        }
      )
    })
  })
}
