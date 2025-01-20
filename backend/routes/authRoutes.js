const express = require("express");
const { loginUser } = require("../controllers/authController");

const router = express.Router();

// Route for user login
router.post("/login", loginUser);

module.exports = router;
