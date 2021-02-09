const authMiddleware = require('../middleware/auth');

module.exports = function (app) {

    const adminController = require('../controllers/admin.controller');

    // signup
    app.post("/admin/signup", adminController.signUpAdmin);

    app.get("/admins", adminController.getAllAdmins);

    app.put("/admin/changepassword/:id", authMiddleware, adminController.changePassword);

}