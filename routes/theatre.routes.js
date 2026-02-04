const theatreController = require("../controllers/theatre.controller")
const {validateTheatreCreateRequest} = require("../middlewares/validateTheatre.middleware")
const {validateUpdateMoviesRequest} = require("../middlewares/validateTheatre.middleware")

const routes = (app)=>{
    app.post("/mba/api/v1/theatre",validateTheatreCreateRequest ,theatreController.create)
    app.get("/mba/api/v1/theatre/:id",theatreController.getTheater)
    app.get("/mba/api/v1/theatre", theatreController.getAllTheater)
    app.delete("/mba/api/v1/theatre/:id", theatreController.deleteTheater)

    app.patch("/mba/api/v1/theatre/:id/movies",validateUpdateMoviesRequest ,theatreController.updateMovies)

}

module.exports =routes
