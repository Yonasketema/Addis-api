const express = require("express");
const {
  getAllFoods,
  createFood,
  getNearbyFood,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const reviewRouter = require("./reviewRoutes");

const router = express.Router({ mergeParams: true });
router.use("/:foodId/reviews", reviewRouter);

router.route("/").post(createFood).get(getAllFoods);
router.route("/:id").delete(deleteFood).patch(updateFood);

router.route("/nearby").get(getNearbyFood);

module.exports = router;
