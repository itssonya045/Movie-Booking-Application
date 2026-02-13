
const bookingServices = require("../services/booking.services")
const { successResponseBody, errorResponseBody } = require("../utils/resposebody")

const create = async(req ,res)=>{
    try {
         
        let userId = req.user
        const response = await bookingServices.createBooking({...req.body , userId : userId})
        successResponseBody.message = "Successfully create the booking"
        successResponseBody.data = response
        return res.status(200).json(successResponseBody)
    } catch (error) {

        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
        
    }
}
const update = async (req, res) => {
  try {
    const response = await bookingServices.updateBooking(
      req.params.id,
      req.body
    );

    if (!response) {
      errorResponseBody.err = "No booking found with this ID";
      return res.status(404).json(errorResponseBody);
    }

    successResponseBody.message = "Successfully updated the booking";
    successResponseBody.data = response;

    return res.status(200).json(successResponseBody);

  } catch (error) {
    console.error(error);
    errorResponseBody.err = error.message || "Internal Server Error";
    return res.status(500).json(errorResponseBody);
  }
};

const getBookings = async (req, res) => {
    

  try {
    const response = await bookingServices.getBooking({
      userId: req.user // better practice
    });

    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all bookings";

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error.message || "Internal Server Error";
    return res.status(500).json(errorResponseBody);
  }
};


const getAllBookings = async (req, res) => {
  try {
    const response = await bookingServices.getAllBooking({}); // no filter

    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all bookings";

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.err = error.message || "Internal Server Error";
    return res.status(500).json(errorResponseBody);
  }
};

const allBookingById = async(req,res)=>{
    try {
        const respose = await bookingServices.getAllBookingById(req.params.id , req.user) 
        successResponseBody.data = respose;
        successResponseBody.message = "Successfully fetch the booking"
        return res.status(200).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error
        return res.status(200).json(successResponseBody)
    }
}


module.exports ={
    create,update,getAllBookings,getBookings,allBookingById
}