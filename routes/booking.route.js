const bookingController = require("../controllers/booking.controller")
const {isAuthenticated} = require("../middlewares/auth.middleware")
const {validateBookingCreateRequest , changeStatus} = require("../middlewares/booking.middleware")

const route = (app)=>{

    app.post("/mba/api/v1/bookings", isAuthenticated ,validateBookingCreateRequest , bookingController.create)
    app.patch("/mba/api/v1/bookings/:id" ,changeStatus , isAuthenticated , bookingController.update )
    app.get("/mba/api/v1/bookings", isAuthenticated , bookingController.getBookings)
     app.get("/mba/api/v1/bookings/all", isAuthenticated , bookingController.getAllBookings)
      app.get("/mba/api/v1/bookings/:id", isAuthenticated , bookingController.allBookingById)
}

module.exports =
    route
