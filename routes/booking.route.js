const bookingController = require("../controllers/booking.controller")
const {isAuthenticated} = require("../middlewares/auth.middleware")
const {validateBookingCreateRequest} = require("../middlewares/booking.middleware")

const route = (app)=>{

    app.post("/mba/api/v1/bookings", isAuthenticated ,validateBookingCreateRequest , bookingController.create)
}

module.exports =
    route
