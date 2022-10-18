const mysql = require("mysql2")
require('dotenv').config()
// const db=mysql.createPool({
// host:"localhost",
// port:3306,
// user:"elscript_motif_new",
// password:"t}(t{)gqou.@",
// database:"elscript_motif_new",
// })

const db = mysql.createPool({
    host: "localhost" || process.env.DB_HOST,
    port: 3308,
    user: "root" || process.env.DB_USER,
    password: "" || process.env.DB_PASS,
    database: "elscript_travel_app" || process.env.DB_NAME,
})

module.exports = db;