const multer = require('multer')
const path = require('path')
// file upload middleware
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // save file location
        callback(null, './public/images')
    },
    // adding file name
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})
// upload file
const upload = multer({ storage: storage })

module.exports = { upload }