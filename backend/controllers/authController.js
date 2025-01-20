const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login User
exports.loginUser = async (req, res) => {
    const { uniqueId, password } = req.body;
    try {
        const user = await User.findOne({ uniqueId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Generate Unique ID
exports.generateUniqueId = (name, roll, hostel) => {
    return `${name.substring(0, 3).toUpperCase()}${roll}${hostel.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 100)}`;
};
