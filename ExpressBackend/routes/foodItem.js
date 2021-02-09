const authMiddleware = require('../middleware/auth');

module.exports = function (app) {

    const foodItemController = require('../controllers/foodItem.controller');


    // ***** Normal CRUD operations*****

    //  add food item
    app.post("/foodItem", authMiddleware, foodItemController.addFoodItem);

    //  delete food item by id
    app.delete("/foodItem/:id", authMiddleware, foodItemController.deleteFoodItemById);

    // get food item by id
    app.get("/foodItem/:id", foodItemController.getFoodItemById);

    // update food item by id
    app.put("/foodItem/:id", authMiddleware, foodItemController.updateFoodItemById);

    //get all the items in the db
    app.get("/foodItems", foodItemController.getAllFoodItems);

    // ****** Advance searches *****
    app.post("/foodItems/filter", foodItemController.getFoodItemsByFilter);

}