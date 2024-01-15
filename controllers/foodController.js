const Food = require("../models/foodModel");
const Restaurant = require("../models/restaurantModel");

exports.postFood = async (req, res) => {
  const { name, price, restaurant, image, description } = req.body;

  try {
    const food = await Food.create({
      name,
      price,
      restaurant,
      description,
      image,
    });

    res.status(201).json({
      status: "success",
      food,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getNearbyFood = async (req, res) => {
  const { lat, log, foodname } = req.query;

  console.table({ lat, log, foodname });

  try {
    const foods = await Restaurant.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [+lat, +log] },
          distanceField: "distance",
          maxDistance: 30000,
          key: "location",
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "restaurant",
          as: "menu",
        },
      },

      {
        $unwind: "$menu",
      },
      // {
      //   $match: {
      //     "menu.name": "",
      //   },
      // },
    ]);

    res.status(200).json({
      status: "success",
      foods,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getRestaurantFoods = async (req, res) => {
  const { restaurant } = req.query;

  try {
    const foods = await Food.find({
      restaurant: restaurant,
    });

    res.status(200).json({
      status: "success",
      foods,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      food,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
