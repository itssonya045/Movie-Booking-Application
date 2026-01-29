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

module.exports = {
  createTheatre,
};
