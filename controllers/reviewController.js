const Food = require("../models/foodModel");

exports.createFoodReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const food = await Food.findById(req.params.foodId);

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
