const userService = require("../services/user.services")
const {successResponseBody,errorResponseBody} =require("../utils/resposebody")


const signIn = async(req,res)=>{
    try {

         const response = await userService.createUser(req.body);
    successResponseBody.data = response
    successResponseBody.message = "Successfully registed User"
    return res.status(200).json(successResponseBody)
        
    } catch (error) {

        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
        
    }
   
}

module.exports = {
    signIn
}