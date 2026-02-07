const errorResponseBody = require("../utils/resposebody")

const Userserivces = require("../services/user.services")

/**
 * Validate CREATE THEATRE request
 */
const validateTheatreCreateRequest = (req, res, next) => {

  if (!req.body.name) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "The name of the theatre is not present in the request"
    });
  }

  if (!req.body.pincode) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "The pincode of the theatre is not present in the request"
    });
  }

  if (isNaN(req.body.pincode)) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "The pincode must contain only numbers"
    });
  }

  if (req.body.pincode.toString().length !== 6) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "The pincode must be exactly 6 digits"
    });
  }

  if (!req.body.city) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "The city of the theatre is not present"
    });
  }

  next();
};


/**
 * Validate UPDATE MOVIES request
 */
const validateUpdateMoviesRequest = (req, res, next) => {

  // validate insert flag
  if (req.body.insert === undefined) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "The insert parameter is missing in the request"
    });
  }

  // validate movieIds presence
  if (!req.body.movieIds) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "No movies present in the request to be updated in theatre"
    });
  }

  // validate movieIds is array
  if (!Array.isArray(req.body.movieIds)) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Expected array of movies but found something else"
    });
  }

  // validate movieIds is not empty
  if (req.body.movieIds.length === 0) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "No movies present in the array provided"
    });
  }

  next();
};








module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMoviesRequest,
  
};
