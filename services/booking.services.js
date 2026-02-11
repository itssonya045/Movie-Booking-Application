const Booking = require("../models/booking.model")
const { errorResponseBody } = require("../utils/resposebody")

const createBooking = async(data)=>{
    try {
        const response = await Booking.create(data)
        return response
    } catch (error) {
        console.log(error)
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
    throw error; // ✅ Let controller handle it
  }
};

module.exports = {
    createBooking, updateBooking
}