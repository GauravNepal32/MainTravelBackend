// Importing Connection from module
const db = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')

// Register Module
module.exports.register = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Checking mail in db
    emailCheckQuery = `SELECT * FROM users_db WHERE LOWER(email) = LOWER(${db.escape(email)});`
    db.query(emailCheckQuery, async (err, result) => {
        if (result.length) {
            // Sending error response
            return res.status(409).json({ msg: 'The email ID is already exist' })
        } else {
            // User ID is available
            const salt = await bcrypt.genSalt();  // Generating salt
            const hasedPassword = bcrypt.hashSync(password, salt)  //Generating hased Password
            // Password is hased
            // Adding email, hassed password to db
            addUserQuery = `INSERT INTO users_db (email,password) VALUES (${db.escape(email)},${db.escape(hasedPassword)})`
            db.query(addUserQuery, (err, result) => {
                if (err) {
                    // sending error response
                    res.status(400).json({ msg: err })
                    throw err;
                }
                // sending success resposne
                return res.status(200).json({ msg: "You have been registered successfully" })
            })
        }
    })
}