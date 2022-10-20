const db = require('../connection')
const _ = require('lodash')

module.exports.book_package = (req, res) => {
    const package_id = req.body.package_id;
    const booking_date = req.body.booking_date;
    const guests = req.body.guests;
    const contact_name = req.body.contact_name;
    const contact_email = req.body.contact_email;
    const insertQuery = `INSERT INTO user_bookings_db (package_id,booking_date,guests,contact_name,contact_email,user_id) VALUES
    (${db.escape(package_id)},${db.escape(booking_date)},${db.escape(guests)},${db.escape(contact_name)},${db.escape(contact_email)},${db.escape(req.user_id)})
    `
    db.query(insertQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Unable to book package" })
        } else if (result) {
            res.status(200).json({ message: "Package Booked Successfully." })
        }
    })
}


module.exports.get_all_booking = (req, res) => {
    const getQuery = `SELECT u.id,p.title as title,u.booking_date,u.guests,u.contact_name,u.contact_email,u.package_status as status,concat(user.first_name,' ',user.last_name) as name FROM
    user_bookings_db as u JOIN packages_db as p
    ON p.id=u.package_id
    JOIN main_users_db as user
    ON user.id=u.user_id
    `
    db.query(getQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Unable to get booking data" })
        } else if (result) {
            res.status(200).json({ message: "Booking data fetched", data: result })
        }
    })
}

module.exports.get_bookin_user = (req, res) => {
    const user_id = req.user_id;
    const getQuery = `SELECT u.id as booking_id,p.title AS package_name,p.duration,p.image,u.booking_date,u.guests,u.contact_name,u.contact_email
    FROM user_bookings_db AS u
    JOIN packages_db AS p
    ON u.package_id=p.id
    WHERE u.user_id=${user_id}`
    db.query(getQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Unable to get booking data" })
        } else if (result) {
            res.status(200).json({ message: "Booking data fetched", data: result })
        }
    })
}

module.exports.edit_status = (req, res) => {
    if (req.body.updateData.length > 0) {
        const updateQuery = `UPDATE user_bookings_db SET package_status='${req.body.updateData[0].status}' WHERE id=${req.body.updateData[0].id} `
        db.query(updateQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: "Unable to update status" })
            } else if (result) {
                res.status(200).json({ message: "Status changed" })
            }


        })
    }
}