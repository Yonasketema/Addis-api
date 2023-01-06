const express = require("express");
const { postRestaurant } = require("../controllers/restaurantController");

const router = express.Router();

router.route("/").post(postRestaurant);

module.exports = router;
