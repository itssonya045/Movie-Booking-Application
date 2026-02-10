const mongoose = require("mongoose");
const { PAYMENT_STATUS } = require("../utils/constants");

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: {
        values: Object.values(PAYMENT_STATUS),
        message: "{VALUE} is not supported"
      },
      default: PAYMENT_STATUS.PENDING
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
