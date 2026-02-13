const theatreService = require("../services/theatre.services")
const {successResponseBody,errorResponseBody} = require("../utils/resposebody")

const create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);

    const successRes = {
      ...successResponseBody,
      data: response,
      message: "Successfully created theatre"
    };

    return res.status(201).json(successRes);

  } catch (error) {
    const errorRes = {
      ...errorResponseBody,
      err: error
    };

    return res.status(500).json(errorRes);
  }
};


const getTheater = async (req, res) => {
    try {
        const response = await theatreService.getTheater(req.params.id);

        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        errorResponseBody.err = "Internal server error";
        return res.status(500).json(errorResponseBody);
    }
};


const getAllTheater = async(req,res)=>{
    try {
        const response = await theatreService.getAllTheater(req.query)
        successResponseBody.data = response
        successResponseBody.message = "successfully fetched all the theater"
        return  res.status(200).json(successResponseBody)
        
    } catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}

const deleteTheater = async(req,res)=>{
 
    try {
        const response = await theatreService.deleteTheater(req.params.id)

        
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully delete theatre";
        return res.status(200).json(successResponseBody);

        
    } catch (error) {

         errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
        
    }
}

const updateMovies = async (req, res) => {
  try {
    const { movieIds, insert } = req.body;
    const theaterId = req.params.id;

    const response = await theatreService.updateMovieInTheater(
      theaterId,
      movieIds,
      insert
    );

    if (response.err) {
      return res.status(response.code).json({
        ...errorResponseBody,        
        err: response.err,
        message: "Failed to update movies in the theater"
      });
    }

    return res.status(200).json({
      ...successResponseBody,       
      data: response,
      message: "Successfully updated movies in the theater"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...errorResponseBody,
      err: error.message
    });
  }
};


const getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInTheater(req.params.id);

    // business error
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched the movies for the theater";
    return res.status(200).json(successResponseBody);

  } catch (error) {
    // system error
    errorResponseBody.err = error.message;
    errorResponseBody.message = "Something went wrong";
    return res.status(500).json(errorResponseBody);
  }
};


const updateTheatre = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const theatre = await theatreService.updateTheatreService(id, data);

    if (!theatre) {
      return res.status(404).json({
        ...errorResponseBody,
        message: 'Theatre not found'
      });
    }

    return res.status(200).json({
      ...successResponseBody,
      message: 'Theatre updated successfully',
      data: theatre
    });

  } catch (error) {


    // Validation error
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

    // Invalid MongoDB ID
    if (error.name === 'CastError') {
      return res.status(400).json({
        ...errorResponseBody,
        message: 'Invalid theatre id'
      });
    }

    return res.status(500).json({
      ...errorResponseBody
    });
  }
};


module.exports = {
    create,
    getTheater,
    getAllTheater,
    deleteTheater,
    updateMovies,
    getMovies,
    updateTheatre
}