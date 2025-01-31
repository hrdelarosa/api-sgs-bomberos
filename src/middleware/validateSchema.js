export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body)
    next()
  } catch (error) {
    if (Array.isArray(error.errors)) {
      const errors = error.errors.map((err) => ({
        field: err.path ? err.path.join('.') : 'unknown',
        message: err.message,
      }))

      return res.status(400).json({
        message: 'Error de validación',
        errors,
      })
    } else {
      return res.status(500).json({
        message: 'Error inesperado en la validación',
        details: error.message || error,
      })
    }
  }
}
