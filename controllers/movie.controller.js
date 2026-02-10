const mongoose = require("mongoose");
const {successResponseBody , errorResponseBody} = require("../utils/resposebody")
const {createMovieService} =require("../services/movie.services")
const {getMovieByIdService} = require("../services/movie.services")
const {deleteMovieService ,updateMovieService,getAllMoviesService} = require('../services/movie.services');


const createMovie = async (req, res) => {
  try {
    const movie = await createMovieService(req.body);

    return res.status(201).json({
      ...successResponseBody,
      data: movie,
      message: 'Movie created successfully'
    });

  } catch (error) {
    console.log('Movie creation error:', error);

    
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return res.status(422).json({
        ...errorResponseBody,
        err,
        message: 'Validation failed'
      });
    }

    // Internal server error
    return res.status(500).json({
      ...errorResponseBody,
      message: error.message
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await getMovieByIdService(id);

    if (!movie) {
      return res.status(404).json({
        ...errorResponseBody,
        message: 'Movie not found'
      });
    }

    return res.status(200).json({
      ...successResponseBody,
      data: movie,
      message: 'Movie fetched successfully'
    });

  } catch (error) {
    console.log('Get movie error:', error);

    // Invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        ...errorResponseBody,
        message: 'Invalid movie id'
      });
    }

    return res.status(500).json({
      ...errorResponseBody
    });
  }}


/* DELETE movie */
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await deleteMovieService(id);

    if (!movie) {
      return res.status(404).json({
        ...errorResponseBody,
        message: 'Movie not found'
      });
    }

    return res.status(200).json({
      ...successResponseBody,
      message: 'Movie deleted successfully',
      data: movie
    });

  } catch (error) {
    console.log('Delete movie error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        ...errorResponseBody,
        message: 'Invalid movie id'
      });
    }

    return res.status(500).json({
      ...errorResponseBody
    });
  }
};

/* UPDATE movie */
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await updateMovieService(id, req.body);

    if (!movie) {
      return res.status(404).json({
        ...errorResponseBody,
        message: 'Movie not found'
      });
    }

    return res.status(200).json({
      ...successResponseBody,
      message: 'Movie updated successfully',
      data: movie
    });

  } catch (error) {
    console.log('Update movie error:', error);

    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return res.status(422).json({
        ...errorResponseBody,
        err,
        message: 'Validation failed'
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        ...errorResponseBody,
        message: 'Invalid movie id'
      });
    }

    return res.status(500).json({
      ...errorResponseBody
    });
  }
};

/* GET all movies */
const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMoviesService();

    return res.status(200).json({
      ...successResponseBody,
      message: 'Movies fetched successfully',
      data: movies,
      count: movies.length
    });

  } catch (error) {
    console.log('Get all movies error:', error);

    return res.status(500).json({
      ...errorResponseBody
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