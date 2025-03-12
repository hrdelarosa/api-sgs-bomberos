export default function customError(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  throw error
}
