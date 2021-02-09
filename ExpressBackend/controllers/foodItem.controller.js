const FoodItem = require('../Models/foodItem.model');
const foodItem = require('../routes/foodItem');

exports.addFoodItem = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const brand = req.body.brand;
    const price = req.body.price;
    const containerType = req.body.containerType;

    if (!name || !description || !category || !brand || !containerType || price < 0) {
        res.status(400).json({
            message: "Please fill all the fields and check that price is not negative !"
        })
    }

    const newFoodItem = new FoodItem({
        name: name,
        description: description,
        category: category,
        brand: brand,
        price: price,
        containerType: containerType
    });

    newFoodItem.save()
        .then(foodItem => {
            res.status(201).json({
                message: "Food item added Successfully !",
                foodItem: {
                    name: foodItem.name,
                    category: foodItem.category,
                    brand: foodItem.brand
                }
            })
        })
        .catch(err => res.status(500).json({
            message: "Unable to add food item due to error : " + err
        }))

};

exports.getFoodItemById = (req, res, next) => {

    const id = req.params.id;

    FoodItem.findById(id)
        .then(foodItem => {
            if (!foodItem) {
                res.status(404).json({
                    message: "Food item not found !"
                })
            }
            res.status(200).json(foodItem);
        })
        .catch(err => {
            return res.status(500).json({
                message: "Unable to find food item due to error : " + err
            })
        })
}


exports.deleteFoodItemById = (req, res, next) => {

    const id = req.params.id;

    FoodItem.findById(id)
        .then(foodItem => {
            if (!foodItem) {
                res.status(404).json({
                    message: "Food item not found !"
                })
            }
            return FoodItem.findByIdAndRemove(id);
        })
        .then(result => {
            res.status(200).json({
                message: "Food item with id: " + id + " deleted successfully !"
            })
        })
        .catch(err => res.status(500).json({
            message: "Unable to delete food item due to error : " + err
        }))
};


exports.updateFoodItemById = (req, res, next) => {

    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const brand = req.body.brand;
    const price = req.body.price;
    const containerType = req.body.containerType;



    if (!name || !description || !category || !brand || !containerType || price < 0) {
        res.status(400).json({
            message: "Please fill all the fields and check that price is not negative !"
        })
    }

    FoodItem.findById(id)
        .then(foodItem => {
            if (!foodItem) {
                res.status(404).json({
                    message: "Food item not found !"
                })
            }

            return FoodItem.findByIdAndUpdate(id, {
                name: name,
                description: description,
                category: category,
                brand: brand,
                price: price,
                containerType: containerType
            }, { new: true });
        })
        .then(foodItem => {
            if (!foodItem) {
                res.status(404).json({
                    message: "Food item not found !"
                })
            }

            res.status(200).json({
                message: "Updation Successful !!",
                foodItem: foodItem
            });
        })
        .catch(err => res.status(500).json({
            message: "Unable to update food item due to error : " + err
        }))

};


exports.getAllFoodItems = (req, res, next) => {

    FoodItem.find()
        .then(foodItems => {
            if (!foodItems) {
                res.status(404).json({
                    message: "Food items not found !"
                })
            }
            res.status(200).json(foodItems);
        })
        .catch(err => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to find food items due to error : " + err
                })
            }
        })
}


exports.getFoodItemsByFilter = (req, res, next) => {

    const category = req.body.category;
    const maxPrice = req.body.maxPrice;
    const containerType = req.body.containerType;

    FoodItem.find({
        category: category,
        price: { $lt: maxPrice },
        containerType: containerType
    })
        .then(foodItems => {
            if (foodItems.length <= 0) {
                res.status(404).json({
                    message: "Food items not found !"
                })
            }
            res.status(200).json(foodItems);
        })
        .catch(err => {
            if (err) {
                res.status(500).json({
                    message: "Unable to find food items due to error : " + err
                })
            }
        })
}


