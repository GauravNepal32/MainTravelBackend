const db = require('../connection')


module.exports.get_location_list = (req, res) => {
    const getQuery = 'SELECT id AS value,name AS label from locations_db'
    db.query(getQuery, (err, result) => {
        if (result) {
            // sending success response
            res.status(200).json({ data: result, message: "Data Fetch Successfully" })
        } else if (err) {
            // sending error response
            console.log(err)
            res.status(400).json({ message: "Data Fetch Failed" })
        }
    })
}

module.exports.get_category_list = (req, res) => {
    const getQuery = 'SELECT id AS value,name AS label from package_categories_db'
    db.query(getQuery, (err, result) => {
        if (result) {
            // sending success response
            res.status(200).json({ data: result, message: "Data Fetch Successfully" })
        } else if (err) {
            // sending error response
            console.log(err)
            res.status(400).json({ message: "Data Fetch Failed" })
        }
    })
}