const db = require('../connection')


module.exports.edit_day = (req, res) => {
    const { id } = req.params;
    const updateQuery = `UPDATE package_daybreak_db SET day='${req.body.day}',description='${req.body.description}' WHERE id=${id}`
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
}

module.exports.delete_day = (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM package_daybreak_db WHERE id=${id}`
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