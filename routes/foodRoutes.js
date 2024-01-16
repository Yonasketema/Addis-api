const express = require("express");
const {
  createFood,
  getNearbyFood,
  getRestaurantFoods,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const reviewRouter = require("./reviewRoutes");

const router = express.Router();
router.use("/:foodId/reviews", reviewRouter);

router.route("/").post(createFood);
router.route("/:id").delete(deleteFood).patch(updateFood);

router.route("/nearby").get(getNearbyFood);
router.route("/restaurantfoods").get(getRestaurantFoods);

module.exports = router;
