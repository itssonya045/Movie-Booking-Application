const mongoose = require("mongoose");
const { errorResponseBody } = require("../utils/resposebody");
const { getTheater } = require("../services/theatre.services");

const validateBookingCreateRequest = async (req, res, next) => {
  try {
    const { theaterId, movieId, timing, numberOfSeat } = req.body;

    // theaterId validation
    if (!theaterId) {
      return res.status(400).json({ err: "Theater ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
      return res.status(400).json({ err: "Invalid Theater ID" });
    }

    const theater = await getTheater(theaterId);
    if (!theater) {
      return res.status(404).json({ err: "Theater not found" });
    }

    // movieId validation
    if (!movieId) {
      return res.status(400).json({ err: "Movie ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ err: "Invalid Movie ID" });
    }

    const movieExistsInTheater = theater.movies
      .map(id => id.toString())
      .includes(movieId);

    if (!movieExistsInTheater) {
      return res
        .status(400)
        .json({ err: "Movie is not available in this theater" });
    }

    // timing validation
    if (!timing) {
      return res.status(400).json({ err: "Timing is required" });
    }

    // seat validation
    if (!numberOfSeat || numberOfSeat <= 0) {
      return res
        .status(400)
        .json({ err: "Number of seats must be greater than 0" });
    }

    // ✅ everything ok
    next();
  } catch (error) {
    console.error("Booking validation error:", error);
    return res.status(500).json({ err: "Internal server error" });
  }
};

module.exports = { validateBookingCreateRequest };
