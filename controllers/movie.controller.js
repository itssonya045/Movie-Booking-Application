const mongoose = require("mongoose");
const Movie = require("../models/movie.model");


const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie
    });

  } catch (error) {
      return res.status(500).json({ success: false, message : error.message})

  }
};


const getMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie fetched successfully",
      data: movie
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};


const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: deletedMovie
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      data,
      {
        new: true,          
        runValidators: true 
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    return res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      count: movies.length,
      data: movies
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};


module.exports = {
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
  getAllMovies
};  