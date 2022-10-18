const db = require('../connection')
const fs = require("fs")


// get packages controller
module.exports.get_packages = (req, res) => {
    // get query

    const getQuery = 'SELECT * from packages_db'
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


module.exports.get_package_by_id = (req, res) => {
    const { id } = req.params;
    const getQuery = `SELECT p.id as id,p.title as package_title,l.name as location,l.id as location_id,
         c.name as category,c.id as category_id, p.duration as duration,p.starting_price as starting_price,
         p.max_guests as max_guests,p.min_age as min_age,p.language as language,p.description as description,
         p.include_list as include_list,p.exclude_list as exclude_list,
         pb.id as day_id,pb.day as day,pb.description as day_description
        FROM packages_db AS p
        LEFT JOIN package_daybreak_db as pb
        on p.id=pb.package
        JOIN locations_db as l
        on l.id=p.location
        JOIN package_categories_db as c
        on c.id=p.category
        WHERE p.id=${id}
         `
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
// add packages controller
module.exports.add_package = (req, res) => {
    // checking for file
    if (!req.file) {
    } else {
        console.log(req.file.filename)
        // adding file name
        var imgsrc = 'http://localhost:8000/images/' + req.file.filename
    }
    const insertQuery = `INSERT INTO packages_db (title,location,category,duration,starting_price,max_guests,min_age,language,description,include_list,exclude_list,image) VALUES ("${req.body.name}","${req.body.location}","${req.body.category}","${req.body.duration}","${req.body.starting_price}","${req.body.max_guests}","${req.body.min_age}","${req.body.language}",'${req.body.description}','${req.body.include_list}','${req.body.exclude_list}','${imgsrc}')`
    db.query(insertQuery, (err, result) => {
        if (err) {
            throw err
        } else if (result) {
            JSON.parse(req.body.stDay).map((da, index) => {
                const insertQuery = `INSERT INTO package_daybreak_db(package,day,description) VALUES ('${result.insertId}','${da.day}','${da.description}')`
                db.query(insertQuery, (err, result) => {
                    if (err) {
                        throw err
                    }
                })
            })
            res.status(200).json({ message: "data added" })
        }
    })
}

// update packages controller
module.exports.update_package = (req, res) => {
    const { id } = req.params;
    // checking for file
    if (!req.file) {
    } else {
        // adding file name
        var imgsrc = 'http://localhost:8000/images/' + req.file.filename
    }
    const updateQuery = `UPDATE packages_db SET title="${req.body.name}", location="${req.body.location}",category="${req.body.category}",duration="${req.body.duration}",starting_price="${req.body.starting_price}",max_guests="${req.body.max_guests}",min_age="${req.body.min_age}",language="${req.body.language}",description='${req.body.description}',include_list='${req.body.include_list}',exclude_list='${req.body.exclude_list}' WHERE id=${id}`
    db.query(updateQuery, (err, result) => {
        if (err) {
            throw err
        } else if (result) {
            {
                req.body.dayBreak[0].day !== '' &&

                    req.body.dayBreak.map((da, index) => {
                        const insertQuery = `INSERT INTO package_daybreak_db(package,day,description) VALUES ('${id}','${da.day}','${da.description}')`
                        db.query(insertQuery, (err, result) => {
                            if (err) {
                                throw err
                            }
                        })
                    })
            }
            res.status(200).json({ message: "data added" })
        }
    })
}


// Delete package

module.exports.delete_package = (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM packages_db WHERE id=${id}`
    db.query(deleteQuery, (err, result) => {
        if (result) {
            // sendiing success message
            res.sendStatus(200)
        } else if (err) {
            // sending error message
            res.sendStatus(400)
        }
    })
}