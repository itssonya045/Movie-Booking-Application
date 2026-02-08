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
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided"
      });
    }

    const decoded = jwt.verify(token, "moviebooking");
    console.log("Decoded:", decoded);

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
    console.log("AUTH ERROR 👉", error);
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports ={ validateSignup , validateSignin , isAuthenticated}
