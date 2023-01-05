const express = require("express");
const { postFood, getNearbyFood } = require("../controllers/foodController");

const router = express.Router();

router.route("/").post(postFood);

router.route("/nearby").get(getNearbyFood);
module.exports = router;
