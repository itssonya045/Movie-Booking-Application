const Theatre = require("../models/theatre.movie");
const Movie = require("../models/movie.model")

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;

  } catch (error) {
    console.log("Theatre creation error:", error);

    if (error.name === "ValidationError") {
      let err = {};

      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err, code: 422 };
    }

    
    return { err: "Something went wrong", code: 500 };
  }
};

const getTheater = async (id) => {
  try {
    const response = await Theatre.findById(id);

    // If no theatre found
    if (!response) {
      return {
        err: "Theatre not found",
        code: 404
      };
    }

    return response;

  } catch (error) {
    console.log("Error while fetching theatre:", error);

    return {
      err: "Something went wrong",
      code: 500
    };
  }
};

const  getAllTheater= async (data) => {
  try {
    let query = {};

    
    if (data?.city) {
      query.city = data.city.trim();
    }

  
    if (data?.pincode) {
      query.pincode = Number(data.pincode);
    }

    
    if (data?.name) {
      query.name = { $regex: data.name.trim(), $options: "i" };
    }

    /*    if(data?.movieId){
      let movie = await Movie.findById(data.movieId)
      query.movies = {$all : movie}
    }*/

  if (data?.movieId) {
  query.movies = data.movieId;  
}


    const page = Number(data.page) || 1;   
    const limit = Number(data.limit) || 2; 
    const skip = (page - 1) * limit;

    const response = await Theatre.find(query).skip(skip).limit(limit);
    return response;

  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getMoviesInTheater = async (id) => {
  try {
    const theater = await Theatre
      .findById(id, { name: 1, movies: 1, city: 1 })
      .populate("movies");

    // if theater not found
    if (!theater) {
      return {
        err: "No theater with the given id",
        code: 404
      };
    }

    return theater;

  } catch (error) {
    // system / mongoose error
    throw error;
  }
};



const deleteTheater = async (id) => {
  const theatre = await Theatre.findByIdAndDelete(id);

  if (!theatre) {
    return {
      err: "Theatre not found",
      code: 404
    };
  }

  return theatre;
};

const updateMovieInTheater = async (theaterId, movieIds, insert) => {
  const theatre = await Theatre.findById(theaterId);
  
  if (!theatre) {
    return {
      err: "No such theater found for the movie id provided...!",
      code: 404
    };
  }

  if (insert) {
    movieIds.forEach(movieId => {
      if (!theatre.movies.includes(movieId)) {
        theatre.movies.push(movieId);
      }
    });
  } else {
    theatre.movies = theatre.movies.filter(
      movieId => !movieIds.includes(movieId.toString())
    );
  }
  await theatre.save();
  return theatre.populate("movies");
};





module.exports = {
  createTheatre,
  getTheater,
  getAllTheater,
  deleteTheater, 
  updateMovieInTheater,
  getMoviesInTheater
};
