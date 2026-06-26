import dotenv from "dotenv"
import mysql from "mysql2/promise"
dotenv.config()

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:process.env.DB_password,
    database: "studenthub"
})

export default pool