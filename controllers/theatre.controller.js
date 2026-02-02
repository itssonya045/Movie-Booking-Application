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

const getTheater = async (req, res) => {
    try {
        const response = await theatreService.getTheater(req.params.id);

        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        errorResponseBody.err = "Internal server error";
        return res.status(500).json(errorResponseBody);
    }
};


const getAllTheater = async(req,res)=>{
    try {
        const response = await theatreService.getAllTheater()
        successResponseBody.data = response
        successResponseBody.message = "successfully fetched all the theater"
        return  res.status(200).json(successResponseBody)
        
    } catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}

const deleteTheater = async(req,res)=>{
    try {
        const response = await theatreService.deleteTheater(req.params.id)

        
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully delete theatre";
        return res.status(200).json(successResponseBody);

        
    } catch (error) {

         errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
        
    }
}
module.exports = {
    create,
    getTheater,
    getAllTheater,
    deleteTheater
}