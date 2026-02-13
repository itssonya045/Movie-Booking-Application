const showServices = require("../services/show.services");
const {successResponseBody,errorResponseBody} = require("../utils/resposebody")

const createShow = async (req, res) => {
  try {
    const response = await showServices.createShow(req.body); 
    successResponseBody.data = response
    successResponseBody.message ="Successfully created the show"

    return res.status(201).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error
    return res.status(500).json(errorResponseBody);
  }
};

const getShows = async (req, res) => {
  try {
    const response = await showServices.getShow(req.query);
   

    successResponseBody.message = "Successfully fetched all the shows";
    successResponseBody.data = response;

    return res.status(200).json(successResponseBody);

  } catch (error) {

    errorResponseBody.err = error.err || error.message || error;
    errorResponseBody.message = "Failed to fetch shows";

    return res.status(500).json(errorResponseBody);
  }
};

const deleteShow =async (req,res)=>{
  try {
    const response = await showServices.deleteShow(req.params.id)
    successResponseBody.message = "Successfully delete the show"
    successResponseBody.data = response
    return res.status(200).json(successResponseBody);


  } catch (error) {

   

    errorResponseBody.err = error.err || error.message || error;
    errorResponseBody.message = "Failed to fetch shows";

    return res.status(500).json(errorResponseBody);
    
  }
}

const updateShows = async(req,res)=>{
  try {

    const response = await showServices.updateShow(req.params.id , req.body)
    successResponseBody.data = response
    successResponseBody.message = "Successfully updates the shows"
     return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error)
    errorResponseBody.err = error
     return res.status(200).json(errorResponseBody);
  }
}
module.exports = {
  createShow , getShows , deleteShow , updateShows
};
