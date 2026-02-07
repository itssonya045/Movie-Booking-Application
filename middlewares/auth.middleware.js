const { errorResponseBody } = require("../utils/resposebody")
const jwt = require("jsonwebtoken")
const Userserivces = require("../services/user.services")

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
    // 1️⃣ Get token from header
    const token = req.headers["x-access-token"];


    if (!token) {
      errorResponseBody.err = "Token is not provided";
      errorResponseBody.message = "Authentication failed";

      return res.status(401).json(errorResponseBody);
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, "moviebooking");
  

    // 3️⃣ Get user from DB
    const user = await Userserivces.getUser(decoded._id);

    if (!user) {
      errorResponseBody.err = "User not found";
      errorResponseBody.message = "Authentication failed";

      return res.status(404).json(errorResponseBody);
    }

    // 4️⃣ Attach user info to request
    req.user = user;

    // 5️⃣ Move to next middleware/controller
    next();
  } catch (error) {
    errorResponseBody.err = error.message;
    errorResponseBody.message = "Invalid or expired token";

    return res.status(401).json(errorResponseBody);
  }
};

module.exports ={ validateSignup , validateSignin , isAuthenticated}
