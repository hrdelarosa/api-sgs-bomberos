import jwt from 'jsonwebtoken'

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })
}

export function refreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err)
      const newToken = jwt.sign(
        { id: decoded.id, us_correo: decoded.us_correo },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      )
      resolve(newToken)
    })
  })
}
