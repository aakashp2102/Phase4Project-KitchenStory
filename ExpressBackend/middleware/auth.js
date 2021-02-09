const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    //Checking the token
    if (!token) {
        res.status(401).json({
            message: "No token passed. Authorization denied !"
        })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //storing user in req
        req.user = decoded;

        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid Token !"
        })
    }
}

module.exports = auth;