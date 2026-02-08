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

    const token = jwt.sign({_id : user._id , email : user.email}, "moviebooking" , { expiresIn: "1h" })
    

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

const resetPassword = async (req, res) => {
  try {
    // 1. Get logged-in user from DB using userId
    const user = await userService.getUserById(req.user);

    // 2. Check old password
    const isOldPasswordCorrect = await user.isValidPassword(
      req.body.oldPassword
    );

    if (!isOldPasswordCorrect) {
      throw {
        err: "Invalid password, please enter correct old password",
        code: 403
      };
    }

    // 3. Set new password (hashed in schema pre-save)
    user.password = req.body.newPassword;

    // 4. Save user
    await user.save();

    successResponseBody.data = user;
    successResponseBody.message =
      "Successfully updated the password for the logged-in user";

    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error.err || "Internal Server Error";
    return res.status(error.code || 500).json(errorResponseBody);
  }
};





module.exports = {
    signUp,
    signIn,
    resetPassword
}