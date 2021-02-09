const Admin = require('../Models/admin.model');
const FoodItem = require('../Models/foodItem.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { has } = require('config');


exports.signUpAdmin = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;

    //basic check
    if (!name || !email || !phone || !username || !password) {
        res.status(400).json({
            message: "Please fill all the fields !"
        })
    }

    var hashPassword = null;
    //check for existing email
    Admin.findOne({ email: email })
        .then(admin => {
            if (admin) {
                res.status(403).json({
                    message: "Email already exists !"
                })
            }


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    const newAdmin = new Admin({ name: name, email: email, phone: phone, username: username, password: hash });
                    newAdmin.save()
                        .then(admin => {
                            res.status(201).json({
                                message: "Signed Up Successfully !",
                                admin: {
                                    id: admin._id,
                                    name: admin.name,
                                    username: admin.username
                                }
                            })
                        })
                        .catch(err => res.status(500).json({
                            message: "Unable to signup due to error : " + err
                        }))
                })
            });
        })
        .catch(err => res.status(500).json({
            message: "Unable to signup due to error : " + err
        }))

}


exports.getAllAdmins = (req, res, next) => {

    Admin.find()
        .then(admins => {
            if (!admins) {
                res.status(404).json({
                    message: "No Admins found !"
                })
            }
            res.status(200).json(admins);
        })
        .catch(err => res.status(500).json({
            message: "Unable to get admins due to error : " + err
        }))

}


exports.changePassword = (req, res, next) => {


    const sentOldPass = req.body.sentOldPass;
    const newPass = req.body.newPass;
    const id = req.params.id;


    if (!sentOldPass || !newPass) {
        res.status(400).json({
            message: "Please fill all the fields !"
        })
    }

    Admin.findById(id)
        .then(admin => {
            if (!admin) {
                res.status(404).json({
                    message: "Admin not found !"
                })
            }


            // console.log(savedPass);
            // console.log(sentOldPass);

            bcrypt.compare(sentOldPass, admin.password)
                .then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({
                            message: "Old password is incorrect !!"
                        })
                    }
                })
                .catch(err => res.status(500).json({
                    message: "Unable to change password due to error : " + err
                }))

            const name = admin.name;
            const email = admin.email;
            const phone = admin.phone;
            const username = admin.username;


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPass, salt, (err, hash) => {
                    if (err) throw err;

                    Admin.findByIdAndUpdate(id, {
                        name: name,
                        email: email,
                        phone: phone,
                        username: username,
                        password: hash
                    }, { new: true })
                        .then(admin => {
                            if (!admin) {
                                res.status(404).json({
                                    message: "Admin not found !"
                                })
                            }
                            res.status(200).json({
                                message: "Password changed successfully !!"
                            });
                        })
                        .catch(err => res.status(500).json({
                            message: "Unable to update password due to error : " + err
                        }))
                });
            })
        })
        .catch(err => res.status(500).json({
            message: "Unable to signup due to error : " + err
        }))
}
