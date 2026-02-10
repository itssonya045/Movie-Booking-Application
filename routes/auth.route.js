const authController = require("../controllers/auth.controller")
const {validateSignup , validateSignin, isAuthenticated, validateRestPassword} = require("../middlewares/auth.middleware")

const routes =(app)=>{

    app.post("/mba/api/v1/auth/signup", validateSignup , authController.signUp),
     app.get("/mba/api/v1/auth/signin" , validateSignin , authController.signIn),
     app.patch("/mba/api/v1/auth/reset" , isAuthenticated , validateRestPassword , authController.resetPassword)

}

module.exports = routes