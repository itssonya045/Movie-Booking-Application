const mongoose = require("mongoose");
const {BOOKING_STATUS } =require("../utils/constant")

const bookingSchema = new mongoose.Schema({
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Theater"
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Movie"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  timing: {
    type: String,
    required: true
  },
  numberOfSeat: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required : true
  },
  status: {
    type: String,
    enum: {
      values: [BOOKING_STATUS.IN_PROGRESS, BOOKING_STATUS.SUCCESSFUL, BOOKING_STATUS.CANCEL ,BOOKING_STATUS.expired],
      message: "{VALUE} is not supported"
    },
    default:BOOKING_STATUS.IN_PROGRESS
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
