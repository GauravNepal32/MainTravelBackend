// Importing Connection from module
const db = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
require('dotenv')

// Register Module
module.exports.register = (req, res) => {
    const fName = req.body.fname;
    const lName = req.body.lname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // Checking mail in db
    emailCheckQuery = `SELECT * FROM main_users_db WHERE LOWER(email) = LOWER(${db.escape(email)});`
    db.query(emailCheckQuery, async (err, result) => {
        if (result.length) {
            // Sending error response
            return res.status(409).json({ msg: 'The email ID  already exist' })
        } else {
            const usernameQuery = `SELECT * from main_users_db WHERE LOWER(username) = LOWER(${db.escape(username)})`;
            db.query(usernameQuery, async (err, result) => {
                if (result.length) {
                    return res.status(409).json({ msg: 'The username already exist' })
                } else {
                    // User ID is available
                    const salt = await bcrypt.genSalt();  // Generating salt
                    const hasedPassword = bcrypt.hashSync(password, salt)  //Generating hased Password
                    // Password is hased
                    // Adding email, hassed password to db
                    addUserQuery = `INSERT INTO main_users_db (email,password,first_name,last_name,username) VALUES (${db.escape(email)},${db.escape(hasedPassword)},${db.escape(fName)},${db.escape(lName)},${db.escape(username)})`
                    db.query(addUserQuery, (err, result) => {
                        if (err) {
                            // sending error response
                            res.status(400).json({ msg: err })
                            throw err;
                        }
                        // sending success resposne
                        const token = jwt.sign({ id: result.insertId }, process.env.SECERT_KEY)
                        return res.status(200).cookie('access-token', token).json({ msg: "You have been registered successfully", user: { id: result.insertId } })
                    })
                }

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
    const loginQuery = `SELECT * FROM main_users_db WHERE email = ${db.escape(email)} OR username=${db.escape(email)}`
    db.query(loginQuery, (err, result) => {
        if (err) {
            console.log(err)
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
                const token = jwt.sign({ id: result[0].id }, process.env.SECERT_KEY)
                // Sending success repsonse
                return res.status(200).cookie('access-token', token).json({ msg: "Login successful", user: { id: result[0].id } })

            }
            // sending error response
            return res.status(401).json({ msg: "Username or password is incorrect" });
        })
    })
}

module.exports.change_password = (req, res) => {
    const user_id = req.user_id
    const getPass = `SELECT password from main_users_db WHERE id=${user_id}`
    db.query(getPass, async (err, result) => {
        if (err) {
            return res.status(401).json({ msg: "Something went wrong" })
        } else if (result) {
            console.log(await bcrypt.compare(req.body.old_password, result[0]['password']))
            bcrypt.compare(req.body.old_password, result[0]['password'], async (err, bResult) => {
                if (err) {
                    return res.status(402).json({ msg: "Old Password doesnot match" })
                }
                if (bResult) {
                    const salt = await bcrypt.genSalt();
                    const hashPassword = bcrypt.hashSync(req.body.new_password, salt)// Generating hashed Password to save in db
                    const updatePass = `UPDATE main_users_db SET password='${hashPassword}' WHERE id=${user_id}`
                    db.query(updatePass, (err, result) => {
                        if (err) {
                            // sending error response
                            res.status(400).json({ msg: "Uable to change the password" })
                            throw err;
                        }
                        if (result) {
                            return res.status(200).json({ msg: "Password Changed Successfully" })
                        }
                    })
                }
            })
        }
    })
}

module.exports.get_info = (req, res) => {
    const user_id = req.user_id;
    const getQuery = `SELECT username,first_name,last_name,email from main_users_db WHERE id=${user_id}`
    db.query(getQuery, (err, result) => {
        if (err) {
            res.status(400).json({ msg: "Unable to retrive message" })
        } else if (result) {
            res.status(200).json({ msg: "Data fetch successful", data: result })
        }
    })
}