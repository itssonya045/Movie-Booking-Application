const theatreController = require("../controllers/theatre.controller")
const validateTheatre = require("../middlewares/validateTheatre.middleware")

const routes = (app)=>{
    app.post("/mba/api/v1/theatre",validateTheatre ,theatreController.create)

}

module.exports =routes
