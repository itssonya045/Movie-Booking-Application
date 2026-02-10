const mongoose = require("mongoose");

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
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ["IN_PROGRESS", "SUCCESSFUL", "CANCEL"],
      message: "{VALUE} is not supported"
    },
    default: "IN_PROGRESS"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
