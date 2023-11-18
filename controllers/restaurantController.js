const Food = require("../models/foodModel");
const Restaurant = require("../models/restaurantModel");

exports.createRestaurant = async (req, res) => {
  const { restaurantName, image, logo, lat, log, description } = req.body;

  try {
    const restaurant = await Restaurant.create({
      restaurantName,
      image,
      logo,
      location: {
        type: "Point",
        coordinates: [log, lat],
      },
      user: req.user.id,
      description,
    });

    req.user.role = "admin";

    req.user.save({ validateBeforeSave: false });

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

exports.getRestaurantByUserid = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.user.id,
    });
    const foods = await Food.find({
      restaurant: restaurant,
    });

    res.status(200).json({
      status: "success",
      restaurant,
      foods,
    });
  } catch (error) {
    res.status(404).json({
      status: "fial",
      error: error.message,
    });
  }
};
