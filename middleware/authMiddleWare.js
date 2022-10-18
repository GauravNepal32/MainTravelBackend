const jwt = require('jsonwebtoken');
const db = require('../connection')
const cookieParser = require("cookie-parser");

require('dotenv').config();
// checking token
function getToken(req) {
  if (
    // checking for bearer token
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}
const requireAuth = (req, res, next) => {
  const token = getToken(req)
  if (!token) {
    // throwing error
    throw new Error("Authorization token is required");
  }
  // verfiying for token
  jwt.verify(token, process.env.SECERT_KEY, function (err, decoded) {
    if (err) {
      throw new Error("Error : " + err);
    } else {
      // sending to next step
      next()
    }
  });
}

const requireToken = (req, res, next) => {
  const access_token = (req.cookies)['access-token']
  if (!access_token) {
    // throwing error
    return res.status(403).json({ msg: "Unauthorized Access! Please Login to continue" })
    throw new Error("Authorization token is required");
  }
  // verfiying for token
  jwt.verify(access_token, process.env.SECERT_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).json({ msg: "Invalid token detected! Please Login to continue" })

    } else {
      req.user_id = decoded.id
      // sending to next step
      next()
    }
  });

}


module.exports = { requireAuth, requireToken }