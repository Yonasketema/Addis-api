const Food = require("../models/foodModel");
const Restaurant = require("../models/restaurantModel");

exports.postFood = async (req, res) => {
  const { name, price, restaurant, image } = req.body;

  try {
    const food = await Food.create({ name, price, restaurant, image });

    res.status(201).json({
      status: "success",
      food,
    });
  } catch (error) {
    res.status(404).json({
      status: "fial",
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
          distanceField: "dist",
          maxDistance: 1500,
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
      status: "fial",
      error: error.message,
    });
  }
};
