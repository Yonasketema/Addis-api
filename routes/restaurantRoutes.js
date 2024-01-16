const express = require("express");
const {
  createRestaurant,
  getRestaurantByUserid,
} = require("../controllers/restaurantController");
const { protect } = require("../controllers/authController");
const foodRouter = require("./foodRoutes");

const router = express.Router();

router.use("/:restaurantId/foods", foodRouter);

router.route("/").post(protect, createRestaurant);

router.route("/user").get(protect, getRestaurantByUserid);

module.exports = router;
