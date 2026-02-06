const { errorResponseBody } = require("../utils/resposebody")

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

module.exports ={ validateSignup }
