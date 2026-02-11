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

module.exports ={
    create
}