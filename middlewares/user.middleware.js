const { errorResponseBody } = require("../utils/resposebody")

const validateUpdateRequest = ( req , res , next)=>{

    if(!(req.body.userRole || req.body.userStatus)){
        errorResponseBody.err = "Please send aleast one parameter"
        return res.status(400).json(errorResponseBody)
    }

    next()

}

module.exports = {validateUpdateRequest}