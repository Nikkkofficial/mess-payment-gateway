const express = require("express");
const { addPaymentRecord, getAllStudents, deleteStudent } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-payment", authMiddleware, addPaymentRecord);
router.get("/students", authMiddleware, getAllStudents);
router.delete("/student/:id", authMiddleware, deleteStudent);

module.exports = router;
