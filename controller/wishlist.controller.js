const db = require('../connection')

module.exports.add_wishlist = (req, res) => {
    const user_id = req.user_id;
    const addQuery = `INSERT INTO user_wishlists_db (user,package) VALUES ('${user_id}','${req.body.package}')`
    db.query(addQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Unable to add package to wishlist" })
        } else if (result) {
            res.status(200).json({ message: "Package Added to Wishlist." })
        }
    })
}

module.exports.get_wishlist = (req, res) => {
    const user_id = req.user_id;
    const getQuery = `SELECT * FROM user_wishlists_db WHERE user=${req.user_id}`
    db.query(getQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Data fetch failed" })
        } else if (result) {
            res.status(200).json({ message: "Data fetch successful.", data: result })
        }
    })
}

module.exports.get_wishlist_data = (req, res) => {
    const user_id = req.user_id;
    const getQuery = `SELECT w.package,p.title,p.image FROM user_wishlists_db as w JOIN packages_db as p on w.package=p.id WHERE user=${req.user_id}`
    db.query(getQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Data fetch failed" })
        } else if (result) {
            res.status(200).json({ message: "Data fetch successful.", data: result })
        }
    })
}



module.exports.delete_wishlist = (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM user_wishlists_db WHERE package=${id} AND user=${req.user_id}`
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