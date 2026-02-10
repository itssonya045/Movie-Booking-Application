
const userController = require("../controllers/user.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const {validateUpdateRequest} = require("../middlewares/user.middleware")

const route = (app)=>{
    app.patch("/mba/api/v1/user/:id" , isAuthenticated ,  validateUpdateRequest , isAdmin, userController.update)
}

module.exports = route