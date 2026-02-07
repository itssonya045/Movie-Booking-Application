const userService = require("../services/user.services")
const {successResponseBody,errorResponseBody} =require("../utils/resposebody")
var jwt = require('jsonwebtoken');


const signUp = async(req,res)=>{
    try {

    const response = await userService.createUser(req.body);
    successResponseBody.data = response
    successResponseBody.message = "Successfully registed User"
    return res.status(200).json(successResponseBody)
        
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error
            return res.status(error.code).json(errorResponseBody)

        }
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
        
    }
   
}




const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Get user by email (service call)
    const user = await userService.getEmail(email);
    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      errorResponseBody.message = "Invalid password for given email";
      errorResponseBody.err = { password: "Password is incorrect" };

      return res.status(401).json(errorResponseBody);
    }

    const token = jwt.sign({id : user.id , email : user.email}, "moviebooking" , { expiresIn: "1h" })
    

    // 3️⃣ Success response
    successResponseBody.message = "Successfully logged in user";
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token
    };

    return res.status(200).json(successResponseBody);

  } catch (error) {
    errorResponseBody.message = error.message;
    errorResponseBody.err = error;

    return res.status(error.statusCode || 500).json(errorResponseBody);
  }
};






module.exports = {
    signUp,
    signIn
}