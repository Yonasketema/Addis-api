const express = require("express");
const { protect } = require("../controllers/authController");
const { createFoodReview } = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createFoodReview);

module.exports = router;
