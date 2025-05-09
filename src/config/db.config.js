const {
  DB_HOST: host,
  DB_USER: user,
  DB_PORT: port,
  DB_PASSWORD: password,
  DB_NAME: database,
} = process.env

export const DBConfig = {
  host,
  user,
  port,
  password,
  database,
}
