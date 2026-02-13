const mongoose = require("mongoose");
const Theater = require("../models/theatre.movie")
const Movie = require("../models/movie.model");
const Show = require("../models/show.model");
const { errorResponseBody } = require("../utils/resposebody");

const validateCreateShow = async (req, res, next) => {
  try {
    const { theaterId, movieId, timing, noOfSeats, price } = req.body;

   
    if (!theaterId || !movieId || !timing || noOfSeats == null || price == null) {
    errorResponseBody.err = "All fields are required"
      return res.status(400).json(errorResponseBody);
    }

    
    if (
      !mongoose.Types.ObjectId.isValid(theaterId) ||
      !mongoose.Types.ObjectId.isValid(movieId)
    ) {
      errorResponseBody.err = "Not valid objectId"
      return res.status(400).json(errorResponseBody);
    }

   
    const theater = await Theater.findById(theaterId);
    if (!theater) {
    errorResponseBody.message = "theater is not found"
      return res.status(404).json(errorResponseBody);
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      errorResponseBody.message = "theater is not found"
      return res.status(404).json(errorResponseBody);
    }
    if (noOfSeats <= 0) {
  errorResponseBody.err = "noOfSeats must be greater than 0";
  return res.status(400).json(errorResponseBody);
}

if (price <= 0) {
  errorResponseBody.err = "Price must be greater than 0";
  return res.status(400).json(errorResponseBody);
}

    next();

  } catch (error) {
    
   errorResponseBody.err = error
    return res.status(404).json(errorResponseBody);
  }
};

const validateUpdateShow = (req,res , next) =>{
    if(req.body.theaterId || req.body.movieId){
        errorResponseBody.err = "You cannot updated those feilds"
          return res.status(404).json(errorResponseBody);
    }
    next()
}

module.exports = {
  validateCreateShow, validateUpdateShow
};
