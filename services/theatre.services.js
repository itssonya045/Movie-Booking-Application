const Theatre = require("../models/theatre.movie");

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

const getAllTheater = async()=>{
  try {

    const response = await  Theatre.find({})
    return response
    
  } catch (error) {
    console.log(error)
    throw error
    
  }
}

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


module.exports = {
  createTheatre,
  getTheater,
  getAllTheater,
  deleteTheater
};
