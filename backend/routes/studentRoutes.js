const express = require("express");
const { getStudentDetails, getPaymentDetails, updatePassword } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/details", authMiddleware, getStudentDetails);
router.get("/payments", authMiddleware, getPaymentDetails);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;
