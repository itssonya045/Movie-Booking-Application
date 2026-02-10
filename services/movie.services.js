const Movie = require("../models/movie.model");

const createMovieService = async (movieData) => {
  const movie = await Movie.create(movieData);
  return movie;
};


const getMovieByIdService = async (movieId) => {
  const movie = await Movie.findById(movieId);
  return movie;
}

const deleteMovieService = async (movieId) => {
  return await Movie.findByIdAndDelete(movieId);
};

const updateMovieService = async (movieId, data) => {
  return await Movie.findByIdAndUpdate(
    movieId,
    data,
    { new: true, runValidators: true }
  );
};

const getAllMoviesService = async () => {
  return await Movie.find();
};




module.exports = {
  createMovieService,getMovieByIdService,deleteMovieService,updateMovieService,getAllMoviesService
}
