const theatreController = require("../controllers/theatre.controller")
const validateTheatre = require("../middlewares/validateTheatre.middleware")

const routes = (app)=>{
    app.post("/mba/api/v1/theatre",validateTheatre ,theatreController.create)
    app.get("/mba/api/v1/theatre/:id",theatreController.getTheater)
    app.get("/mba/api/v1/theatre", theatreController.getAllTheater)
    app.delete("/mba/api/v1/theatre/:id", theatreController.deleteTheater)

}

module.exports =routes
