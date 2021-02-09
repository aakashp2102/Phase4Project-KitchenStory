module.exports = function (app) {

    const authController = require('../controllers/auth.controller');

    //login
    app.post("/auth/admin/login", authController.loginAdmin);

}