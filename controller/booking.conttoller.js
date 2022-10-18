const db = require('../connection')

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

module.exports.get_bookin_user = (req, res) => {
    const user_id = req.user_id;
    const getQuery = `SELECT p.title AS package_name,p.duration,p.image,u.booking_date,u.guests,u.contact_name,u.contact_email
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