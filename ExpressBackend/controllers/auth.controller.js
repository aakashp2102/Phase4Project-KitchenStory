const Admin = require('../Models/admin.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


exports.loginAdmin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    //basic check
    if (!email || !password) {
        res.status(400).json({
            message: "Please fill all the fields !"
        })
    }

    //Check if user with sent email exist
    Admin.findOne({ email: email })
        .then(admin => {
            if (!admin) {
                res.status(400).json({
                    message: "Admin doesn't exists !"
                })
            }

            bcrypt.compare(password, admin.password)
                .then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({
                            message: "Invalid Credentials !!"
                        })
                    }

                    jwt.sign({
                        id: admin._id
                    }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.status(201).json({
                            token: token,
                            admin: {
                                id: admin._id,
                                name: admin.name,
                                username: admin.username
                            }
                        });
                    })

                })
                .catch(err => res.status(500).json({
                    message: "Unable to login due to error : " + err
                }))
        })
        .catch(err => res.status(500).json({
            message: "Unable to login due to error : " + err
        }))

}