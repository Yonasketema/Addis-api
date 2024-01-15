const express = require("express");
const { signup, login, protect } = require("../controllers/authController");
const { me } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", protect, me);

module.exports = router;
