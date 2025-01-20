const User = require("../models/User");
const Payment = require("../models/Payment");

// Add Payment Record
exports.addPaymentRecord = async (req, res) => {
    const { studentId, month, year, amount } = req.body;
    try {
        const payment = new Payment({ studentId, month, year, amount });
        await payment.save();
        res.json({ message: "Payment record added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" });
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
