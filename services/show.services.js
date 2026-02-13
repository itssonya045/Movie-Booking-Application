const Show = require("../models/show.model");

const createShow = async (data) => {
  try {
    const response = await Show.create(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getShow = async(data)=>{
  
  try {
    let query = {}
    if(data.theaterId){
      query.theaterId = data.theaterId
    }
    if(data.movieId){
      query.movieId = data.movieId
    }

    const response = await Show.find(query)

    if(!response){
      throw{
        err : "No show found",
        code : 404
      }
    }

    return response
  } catch (error) {
   
    throw error
  }
}

const deleteShow =async(id)=>{
  try {
    const response = await Show.findByIdAndDelete(id)
      if(!response){
      throw{
        err : "No show found",
        code : 404
      }
    }

    return response
    
  } catch (error) {
    throw error
    
  }
}

const updateShow = async(id,data)=>{
  try {
    const response = await Show.findByIdAndUpdate(id,data,{
      runValidators : true , new : true
    })
    if(!response){
      throw{
        err : "No update the theater",
        code : 400
      }
    }
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  createShow , getShow ,deleteShow ,updateShow
};
