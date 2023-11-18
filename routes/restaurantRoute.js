const express = require("express");
const {
  createRestaurant,
  getRestaurantByUserid,
} = require("../controllers/restaurantController");
const { protect } = require("../controllers/authControllers");

const router = express.Router();

router.route("/").post(protect, createRestaurant);

router.route("/user").get(protect, getRestaurantByUserid);
module.exports = router;
