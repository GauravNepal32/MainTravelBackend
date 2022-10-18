const db = require('../connection')

module.exports.add_comment = (req, res) => {
    const qualityRating = req.body.quality
    const locationRating = req.body.location
    const amenitiesRating = req.body.amenities
    const servicesRating = req.body.services
    const priceRating = req.body.price
    const posterName = req.body.name
    const posterEmail = req.body.email
    const commentDesc = req.body.description
    const package = req.body.package
    const date = req.body.date
    const insertQuery = `INSERT INTO package_comments_db (name,email,description,qualityRating,locationRating,amenitiesRating,serviceRating,priceRating,package,date) VALUES
        ('${posterName}','${posterEmail}','${commentDesc}','${qualityRating}','${locationRating}','${amenitiesRating}','${servicesRating}','${priceRating}',${package},'${date}')
    `
    db.query(insertQuery, (err, result) => {
        if (result) {
            // sending success message
            res.status(200).json({ message: "Comment Added Successfully" })
        } else if (err) {
            console.log(err)
            // sending error message
            res.status(400).json({ message: "Comment couldnot be added" })
        }
    })
}

module.exports.get_comment = (req, res) => {
    const { id } = req.params;
    const getQuery = `SELECT name,description,qualityRating,locationRating,amenitiesRating,serviceRating,priceRating,date from package_comments_db WHERE package=${id}`
    db.query(getQuery, (err, result) => {
        if (result) {
            // sending success message
            res.status(200).json({ message: "Data fetch successfully", data: result })
        } else if (err) {
            console.log(err)
            // sending error message
            res.status(400).json({ message: "Couldnot fetch data" })
        }
    })
}

module.exports.get_review = (req, res) => {
    const { id } = req.params;
    const getQuery = `SELECT count(id) AS number,round(AVG(qualityRating),1) AS qualityRating,round(AVG(locationRating),1) AS locationRating,round(AVG(serviceRating),1) AS serviceRating,round(AVG(priceRating),1) AS priceRating,round(AVG(amenitiesRating),1) AS amenitiesRating FROM package_comments_db WHERE package=${id}`
    db.query(getQuery, (err, result) => {
        if (result) {
            // sending success message
            res.status(200).json({ message: "Data fetch successfully", data: result })
        } else if (err) {
            console.log(err)
            // sending error message
            res.status(400).json({ message: "Couldnot fetch data" })
        }
    })
}