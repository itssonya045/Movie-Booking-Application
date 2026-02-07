const authController = require("../controllers/auth.controller")
const {validateSignup , validateSignin} = require("../middlewares/auth.middleware")

const routes =(app)=>{

    app.post("/mba/api/v1/auth/signup", validateSignup , authController.signUp),
     app.get("/mba/api/v1/auth/signin" , validateSignin , authController.signIn)

}

module.exports = routes