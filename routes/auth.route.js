const authController = require("../controllers/auth.controller")
const {validateSignup} = require("../middlewares/auth.middleware")

const routes =(app)=>{

    app.post("/mba/api/v1/auth/signup", validateSignup , authController.signUp),
     app.get("/mba/api/v1/auth/signin" , authController.signIn)

}

module.exports = routes