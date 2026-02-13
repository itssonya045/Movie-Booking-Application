const { errorResponseBody } = require("../utils/resposebody")
const jwt = require("jsonwebtoken")
const Userserivces = require("../services/user.services")
const {USER_ROLE , USER_STATUS} = require("../utils/constant")

const validateSignup = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "Name is not present"
    })
  }

  if (!req.body.email) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "Email is not present"
    })
  }

  if (!req.body.password) {
    return res.status(400).json({
      ...errorResponseBody,
      err: "Password is not present"
    })
  }

  next()
}


const validateSignin  = (req,res,next)=>{
  if(!req.body.email){
    return res.status(400).json({
      ...errorResponseBody,
      err : "email is not valid"
    })
  }

  if(!req.body.password){
    return res.status(400).json({
      ...errorResponseBody,
      err : "Password is not valid"
    })

  }

  next()
}

const isAuthenticated = async (req, res, next) => {
 

  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided"
      });
    }

    const decoded = jwt.verify(token, "moviebooking");
    

    const user = await Userserivces.getUser(decoded._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user._id;
    next();
  } catch (error) {
  
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

const validateRestPassword = async (req ,res , next) =>{

  if(!req.body.oldPassword){
    errorResponseBody.err = "Missing the old password in request"
  }

  if(!req.body.newPassword){
    errorResponseBody.err = "Missing the new password in request"
  }

  next()
}

const isAdmin = async(req,res,next)=>{
  const user = await Userserivces.getUser(req.user)
  if(user.userRole != USER_ROLE.admin){
    errorResponseBody.err = "User is not admin , cannot procced the request"
    return res.status(402).json(errorResponseBody)
  }
  next()
}

const isClient = async(req,res,next)=>{
  const user = await Userserivces.getUser(req.user)
  if(user.userStatus != USER_STATUS.client){
    errorResponseBody.err = "User is not client , cannot procced the request"
    return res.status(402).json(errorResponseBody)
  }
  next()
}

const isAdminOrClient = async(req,res,next) =>{
   const user = await Userserivces.getUser(req.user)
   if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client){
    errorResponseBody.err = "User is not client or admin, cannot procced the request"
    return res.status(402).json(errorResponseBody)

   }

   next()
}

module.exports ={ validateSignup , validateSignin , isAuthenticated , validateRestPassword , isAdmin , isClient , isAdminOrClient}
