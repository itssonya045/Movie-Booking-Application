const mongoose = require("mongoose");


const validateMovie = (req, res, next) => {

  const { id } = req.params;

  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid movie ID"
    });
  }

  if (["POST", "PUT", "PATCH"].includes(req.method)) {

    const {
      name,
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releaseStatus,
      poster
    } = req.body;

    // name
    if (
  !name ||
  typeof name !== "string" ||
  name.trim().length < 2 ||
  !/[a-zA-Z]/.test(name)
) {
  return res.status(400).json({
    success: false,
    message: "Movie name must contain letters and be at least 2 characters long"
  });
}


    // description
    if (!description || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Description is required"
      });
    }

    // casts
    if (!Array.isArray(casts) || casts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Casts must be a non-empty array"
      });
    }

    // trailerUrl
    if (!trailerUrl) {
      return res.status(400).json({
        success: false,
        message: "Trailer URL is required"
      });
    }

    // language
    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is required"
      });
    }

    // releaseDate
    if (!releaseDate || isNaN(Date.parse(releaseDate))) {
      return res.status(400).json({
        success: false,
        message: "Valid release date is required"
      });
    }

    // director
    if (!director) {
      return res.status(400).json({
        success: false,
        message: "Director name is required"
      });
    }

    // releaseStatus
    const allowedStatus = ["UPCOMING", "RELEASED"];
    if (!releaseStatus || !allowedStatus.includes(releaseStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid release status"
      });
    }

    // poster
    if (!poster) {
      return res.status(400).json({
        success: false,
        message: "Poster URL is required"
      });
    }
  }

  next(); 
};

module.exports = validateMovie;
