const express = require("express");
const {
  postFood,
  getNearbyFood,
  getRestaurantFoods,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const router = express.Router();

router.route("/").post(postFood);

router.route("/:id").delete(deleteFood).patch(updateFood);

router.route("/nearby").get(getNearbyFood);
router.route("/restaurantfoods").get(getRestaurantFoods);

module.exports = router;
