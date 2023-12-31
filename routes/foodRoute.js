const express = require("express");
const {
  postFood,
  getNearbyFood,
  getRestaurantFoods,
  deleteFood,
  updateFood,
  createFoodReview,
} = require("../controllers/foodController");
const { protect } = require("../controllers/authControllers");

const router = express.Router();

router.route("/").post(postFood);

router.route("/:id").delete(deleteFood).patch(updateFood);
router.route("/:id/reviews").post(protect, createFoodReview);

router.route("/nearby").get(getNearbyFood);
router.route("/restaurantfoods").get(getRestaurantFoods);

module.exports = router;
