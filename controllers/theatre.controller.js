const theatreService = require("../services/theatre.services")
const {successResponseBody,errorResponseBody} = require("../utils/resposebody")

const create = async(req,res)=>{
    try {
        const respose = await theatreService.createTheatre(req.body)
        if(respose.err){
            errorResponseBody.err = respose.err
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(respose.code).json(errorResponseBody)
        }
        successResponseBody.data = respose
        successResponseBody.message = "Successfully created theatre"
        res.status(201).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error
        res.status(500).json(errorResponseBody)
        
    }
}

module.exports = {
    create
}