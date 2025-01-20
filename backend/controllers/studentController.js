const User = require("../models/User");
const Payment = require("../models/Payment");

// Get Student Details
exports.getStudentDetails = async (req, res) => {
    try {
        const student = await User.findById(req.user.id).select("-password");
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Payment Details
exports.getPaymentDetails = async (req, res) => {
    try {
        const payments = await Payment.find({ studentId: req.user.id });
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Password
exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const student = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(oldPassword, student.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(newPassword, salt);
        await student.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
