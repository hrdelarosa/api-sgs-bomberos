import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies

  if (!token)
    return res
      .status(401)
      .json({ message: 'Token no proporcionado, autorizacion denegada.' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalido' })

    req.user = decoded
    next()
  })
}
