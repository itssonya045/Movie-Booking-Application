const bookingController = require("../controllers/booking.controller")
const {isAuthenticated} = require("../middlewares/auth.middleware")
const {validateBookingCreateRequest , changeStatus} = require("../middlewares/booking.middleware")

const route = (app)=>{

    app.post("/mba/api/v1/bookings", isAuthenticated ,validateBookingCreateRequest , bookingController.create)
    app.patch("/mba/api/v1/bookings/:id" ,changeStatus , isAuthenticated , bookingController.update )
}

module.exports =
    route
