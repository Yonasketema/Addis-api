const express = require("express");
const {
  postFood,
  getNearbyFood,
  getRestaurantFoods,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const reviewRouter = require("./reviewRoutes");

const router = express.Router();
router.use("/:foodId/reviews", reviewRouter);

router.route("/").post(postFood);
router.route("/:id").delete(deleteFood).patch(updateFood);
router.route("/nearby").get(getNearbyFood);
router.route("/restaurantfoods").get(getRestaurantFoods);

module.exports = router;
