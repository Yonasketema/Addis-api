const express = require("express");
const { protect } = require("../controllers/authControllers");
const { createFoodReview } = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createFoodReview);

module.exports = router;
