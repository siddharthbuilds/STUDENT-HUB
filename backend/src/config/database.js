import dotenv from "dotenv"
import mysql from "mysql2/promise"
dotenv.config()

const pool = mysql.createPool({
    host:process.env.DB_host,
    user:process.env.DB_user,
    password:process.env.DB_password,
    database: process.env.DB_database
})

export default pool