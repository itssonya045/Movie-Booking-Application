const Booking = require("../models/booking.model")
const { errorResponseBody } = require("../utils/resposebody")

const createBooking = async(data)=>{
    try {
        const response = await Booking.create(data)
        return response
    } catch (error) {
     
        return error
    }
}

const updateBooking = async (bookingId, data) => {
  try {
    const response = await Booking.findByIdAndUpdate(
      bookingId,
      data,
      {
        runValidators: true,
        new: true
      }
    );

    return response; // ✅ IMPORTANT
  } catch (error) {
    throw error;
  }
};

const getBooking = async (data)=>{
  

    try {
        const response = await Booking.find({
            userId : data.userId
        })
        return response
    } catch (error) {
        throw error
    }

}


const getAllBooking = async (data)=>{
    try {
        const response = await Booking.find({})
        return response
    } catch (error) {
        throw error
    }

}

const getAllBookingById = async(id)=>{
    try {

        const response = await Booking.findById(id)
        return response
        
    } catch (error) {
        throw error
    }
}
module.exports = {
    createBooking, updateBooking , getBooking , getAllBooking , getAllBookingById
}