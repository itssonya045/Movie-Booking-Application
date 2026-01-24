const Movie = require("../models/movie.model");

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie,
      message: "Movie created successfully...!"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await Movie.deleteOne({
      _id: req.params.movieId
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: {},
        message: "Movie not found",
        data: {}
      });
    }

    return res.status(200).json({
      success: true,
      error: {},
      message: "Successfully deleted the movie",
      data: response
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
      message: "Something went wrong",
      data: {}
    });
  }
};



module.exports = {
  createMovie,
  deleteMovie
};
