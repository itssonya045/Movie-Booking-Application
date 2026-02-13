const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
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
  timing: {
    type: Date,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    enum: ["2D", "3D", "IMAX"],
    default: "2D"
  }
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);
