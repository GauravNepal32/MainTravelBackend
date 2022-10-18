const db = require('../connection')

module.exports.searchQuery = (req, res) => {
    const location = req.body.location
    const activity = req.body.activity
    const min_duration = req.body.min_duration
    const max_duration = req.body.max_duration
    const guests = req.body.guests;
    var searchQuery = `SELECT t1.*,l.name AS location_name FROM (SELECT * FROM packages_db AS p WHERE p.location=${location} AND p.category=${activity} AND p.duration > ${min_duration}  AND p.duration<${max_duration} AND p.max_guests>${guests}) t1 JOIN locations_db AS l ON l.id=t1.location`

    if (guests === '') {
        searchQuery = `SELECT t1.*,l.name AS location_name FROM (SELECT * FROM packages_db AS p WHERE p.location=${location} AND p.category=${activity} AND p.duration > ${min_duration}  AND p.duration < ${max_duration}) AS t1 JOIN locations_db AS l ON l.id=t1.location`

    } else if (min_duration === '' && max_duration === '') {
        var searchQuery = `SELECT t1.*,l.name AS location_name FROM (SELECT * FROM packages_db AS p WHERE p.location=${location} AND p.category=${activity} AND p.max_guests>${guests}) t1 JOIN locations_db AS l ON l.id=t1.location`
    }
    else if (activity === '') {
        var searchQuery = `SELECT t1.*,l.name AS location_name FROM (SELECT * FROM packages_db AS p WHERE p.location=${location} AND p.duration > ${min_duration}  AND p.duration<${max_duration} AND p.max_guests>${guests}) t1 JOIN locations_db AS l ON l.id=t1.location`
    } else if (location === '') {
        var searchQuery = `SELECT t1.*,l.name AS location_name FROM (SELECT * FROM packages_db AS p WHERE p.category=${activity} AND p.duration > ${min_duration}  AND p.duration<${max_duration} AND p.max_guests>${guests}) t1 JOIN locations_db AS l ON l.id=t1.location`
    }

    db.query(searchQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Something went wrong.." })
        } else if (result) {
            res.status(200).json({ message: "Search completed", data: result })
        }
    })
}

module.exports.getLocation = (req, res) => {
    const getQuery = `SElECT id,name from locations_db`
    db.query(getQuery, (err, result) => {
        if (err) {
            res.status(400).json({ message: "Unable to retrive data" })
        } else if (result) {
            res.status(200).json({ message: "Data fetch successfully", data: result })
        }
    })
}

module.exports.getActivity = (req, res) => {
    const getQuery = `SElECT id,name from package_categories_db`
    db.query(getQuery, (err, result) => {
        if (err) {
            res.status(400).json({ message: "Unable to retrive data" })
        } else if (result) {
            res.status(200).json({ message: "Data fetch successfully", data: result })
        }
    })
}