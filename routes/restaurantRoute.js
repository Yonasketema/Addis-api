const express = require("express");
const { createRestaurant } = require("../controllers/restaurantController");

const router = express.Router();

router.route("/").post(createRestaurant);

module.exports = router;
