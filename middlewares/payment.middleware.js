const { errorResponseBody } = require("../utils/resposebody");
const ObjectId = require("mongoose").Types.ObjectId;


const verifyPaymentRequest = (req, res, next) => {

    if (!req.body.bookingId) {
        errorResponseBody.err = "Booking ID is required";
        return res.status(400).json(errorResponseBody);
    }

    if (!ObjectId.isValid(req.body.bookingId)) {
        errorResponseBody.err = "Invalid booking ID format";
        return res.status(400).json(errorResponseBody);
    }

    if (
        req.body.amount === undefined ||
        typeof req.body.amount !== "number" ||
        req.body.amount <= 0
    ) {
        errorResponseBody.err = "Amount must be a positive number";
        return res.status(400).json(errorResponseBody);
    }

    next();
};

module.exports = verifyPaymentRequest;
