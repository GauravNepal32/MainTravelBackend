const db = require('../connection')
const fs = require("fs")

// add location controller
module.exports.add_location = (req, res) => {
    // getting data from the request
    const name = req.body.name;
    const district = req.body.district;
    const description = req.body.description;
    const area = req.body.area;
    // checking for file
    if (!req.file) {
    } else {
        // adding file name
        var imgsrc = 'http://localhost:8000/images/' + req.file.filename
    }
    // Insert query
    const insertQuery = `INSERT INTO locations_db (name,district,description,area,thumbnail) VALUES ("${name}","${district}",'${description}',"${area}","${imgsrc}")`
    db.query(insertQuery, (err, result) => {
        if (result) {
            // sending success message
            res.status(200).json({ message: "Data Added Successfully" })
        } else if (err) {
            console.log(err)
            // sending error message
            res.status(400).json({ message: "Data couldnot be added" })
        }
    })
};


// get locations controller
module.exports.get_locations = (req, res) => {
    // get query
    const getQuery = "SELECT * FROM locations_db"
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




// delete locations controller
module.exports.delete_location = (req, res) => {
    // getting data from the response
    const { id } = req.params;
    const getQuery = `SELECT thumbnail as image from locations_db WHERE locations_db.id=${id}`
    var image = '';
    // getting image name from the database
    db.query(getQuery, (err, result) => {
        if (result) {
            image = result[0].image
        }
    })
    //delete quert
    const deleteQuery = `DELETE FROM locations_db WHERE locations_db.id=${id}`
    db.query(deleteQuery, (err, result) => {
        if (result) {
            var ret = image.replace('http://localhost:8000/images/', '');
            const path = `./public/images/${ret}`
            console.log(path)
            // delete file from the server
            fs.unlink(path, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("File removed:", path);
                }
            });
            // sendiing success message
            res.sendStatus(200)
        } else if (err) {
            // sending error message
            res.sendStatus(400)
        }
    })
}

module.exports.get_location_by_id = (req, res) => {
    const { id } = req.params;
    const getQuery = `SELECT * FROM locations_db WHERE locations_db.id=${id}`
    db.query(getQuery, (err, result) => {
        if (result) {
            res.status(200).json({ data: result, message: "Data Fetch Successful" })
        } else if (err) {
            console.log(err)
            res.status(400).json({ message: "Data Fetch Failed" })
        }
    })
}


// Update location controller
module.exports.update_location = (req, res) => {
    // getting data from the request
    const { id } = req.params;
    const name = req.body.name;
    const district = req.body.district;
    const description = req.body.description;
    const area = req.body.area;
    var imgsrc = ''
    // checking for file upload
    if (!req.file) {
        imgsrc = req.body.oldImage
    } else {
        // setting file name
        imgsrc = 'http://localhost:8000/images/' + req.file.filename
        var ret = req.body.oldImage.replace('http://localhost:8000/images/', '');
        const path = `./public/images/${ret}`
        fs.unlink(path, function (err) {
            // deleteing old file
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
    // update query
    const updateQuery = `UPDATE locations_db SET name = '${name}', district = '${district}',area='${area}' , description = '${description}',thumbnail='${imgsrc}' WHERE locations_db.id=${id}`
    db.query(updateQuery, (err, result) => {
        if (result) {
            // sending success response
            res.status(200).json({ message: "Data Updated Successfully" })
        } else if (err) {
            console.log(err)
            // sending error response
            res.status(400).json({ message: "Data couldnot be updated" })
        }
    })
};