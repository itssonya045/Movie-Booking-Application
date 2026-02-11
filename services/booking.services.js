const Booking = require("../models/booking.model")

const createBooking = async(data)=>{
    try {
        const response = await Booking.create(data)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    createBooking
}