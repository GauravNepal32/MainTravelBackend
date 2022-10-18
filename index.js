const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const multer = require('multer')
const path = require('path')
require('dotenv').config();

const app = express();

// Middleware

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))



// Making public file available to the server
app.use(express.static(path.resolve('./public')));


app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'your-production-domain']
}));
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});


// Running server
app.listen(8000, () => {
    console.log("Server is running")
})

const loginRoutes = require('./route/login.route');
app.use(loginRoutes);

const registerRoutes = require('./route/register.route');
app.use(registerRoutes);

const locationRoutes = require('./route/location.route');
app.use(locationRoutes);
const packageRoutes = require('./route/package.route');
app.use(packageRoutes);

const listRoutes = require('./route/list.route');
app.use(listRoutes);

const searchRoutes = require('./route/search.route');
app.use(searchRoutes);


const commentRoutes = require('./route/comment.routes');
app.use(commentRoutes);

const userLoginRoutes = require('./route/main.login.route');
app.use(userLoginRoutes);

const bookingRoutes = require('./route/booking.route');
app.use(bookingRoutes);