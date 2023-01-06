const Restaurant = require("../models/restaurantModel");

exports.postRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      status: "success",
      restaurant,
    });
  } catch (error) {
    res.status(404).json({
      status: "fial",
      error: error.message,
    });
  }
};
