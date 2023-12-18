// export const HOST = process.env.DB_HOST
// export const USER = process.env.DB_USER
// export const PASSWORD = process.env.DB_PASSWORD
// export const DB = process.env.DB_NAME
// export const port = process.env.DB_PORT
// export const dialect = "mysql"
// export const pool = {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
// };
import dotenv from 'dotenv'
dotenv.config()

const HOST = process.env.DB_HOST
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const DB = process.env.DB_NAME
const port = process.env.DB_PORT
const dialect = "mysql"
const pool = {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
}

export default { HOST, USER, PASSWORD, DB, port, dialect, pool }