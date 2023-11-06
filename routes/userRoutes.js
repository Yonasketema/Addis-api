const express = require("express");
const { signup, login, protect } = require("../controllers/authControllers");
const { me } = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", protect, me);

module.exports = router;
