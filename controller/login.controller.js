// Importing Connection from module
const db = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')

// Register Module
module.exports.register = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
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
            addUserQuery = `INSERT INTO users_db (email,password,name,role) VALUES (${db.escape(email)},${db.escape(hasedPassword)},${db.escape(name)},${role})`
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

// Login Module
module.exports.login = (req, res) => {
    // getting data from request
    const email = req.body.email;
    const password = req.body.password;
    // Checking email in db
    const loginQuery = `SELECT * FROM users_db WHERE email= ${db.escape(email)}`
    db.query(loginQuery, (err, result) => {
        if (err) {
            // sending error
            res.status(400).send({ msg: err })
        }
        if (!result.length) {
            // checking if email exists in db
            return res.status(401).json({ msg: "No account under that email" })
        }
        // checking password for the email
        bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
            if (bErr) {
                // sending error message
                return res.status(401).json({ msg: "Email or Password doesnot match" });
            }
            if (bResult) {
                // If password match
                const token = jwt.sign({ id: result[0].id, role: 'admin' }, process.env.SECERT_KEY)
                // Sending success repsonse
                return res.status(200).json({ msg: "Login Successfully", token, user: { id: result[0].id, role: result[0].role } })
            }
            // sending error response
            return res.status(401).json({ msg: "Username or password is incorrect" });
        })
    })
}