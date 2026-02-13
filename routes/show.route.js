const { isAuthenticated, isAdminOrClient } = require("../middlewares/auth.middleware");
const ShowController = require("../controllers/show.controller")
const {validateCreateShow , validateUpdateShow} = require("../middlewares/show.middleware")

const routes =  (app) =>{
    app.post("/mba/api/v1/shows",isAuthenticated , isAdminOrClient , validateCreateShow , ShowController.createShow)
    app.get("/mba/api/v1/shows" , ShowController.getShows)
    app.delete("/mba/api/v1/shows/:id" , isAuthenticated, isAdminOrClient, ShowController.deleteShow)
    app.patch("/mba/api/v1/shows/:id" ,isAuthenticated , isAdminOrClient, validateUpdateShow  , ShowController.updateShows)
}

module.exports =routes