const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
