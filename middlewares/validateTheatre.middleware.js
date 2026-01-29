const { errorResponseBody } = require("../utils/resposebody")

const validateTheatreCreateRequest = (req, res, next) => {

    
    if (!req.body.name) {
        errorResponseBody.err = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    
    if (!req.body.pincode) {
        errorResponseBody.err = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    
    if (isNaN(req.body.pincode)) {
        errorResponseBody.err = "The pincode must contain only numbers";
        return res.status(400).json(errorResponseBody);
    }


    if (req.body.pincode.toString().length !== 6) {
        errorResponseBody.err = "The pincode must be exactly 6 digits";
        return res.status(400).json(errorResponseBody);
    }

    
    if (!req.body.city) {
        errorResponseBody.err = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }

    next();
};

module.exports = validateTheatreCreateRequest;
