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
      status: "fial",
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
      status: "fial",
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

exports.createFoodReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const food = await Food.findById(req.params.id);

    if (food) {
      const alreadyReviewed = food.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user.id,
      };

      food.reviews.push(review);

      food.numReviews = food.reviews.length;

      food.rating =
        food.reviews.reduce((acc, item) => item.rating + acc, 0) /
        food.reviews.length;

      await food.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Food not found");
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
