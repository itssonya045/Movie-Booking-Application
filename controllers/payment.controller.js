const PaymentServices = require("../services/payment.services")
const { BOOKING_STATUS } = require("../utils/constant")
const { errorResponseBody, successResponseBody } = require("../utils/resposebody")

const create = async (req, res) => {
    try {

        const response = await PaymentServices.createPayment(req.body)

        if (response.status === BOOKING_STATUS.EXPIRED) {
            errorResponseBody.err = "Payment took too much time!";
            errorResponseBody.data = response;
            return res.status(400).json(errorResponseBody);
        }

        successResponseBody.message = "Payment processed successfully";
        successResponseBody.data = response;

        return res.status(200).json(successResponseBody);

    } catch (error) {

        errorResponseBody.err = error;
        return res.status(error.status || 500).json(errorResponseBody);
    }
}

const getPaymentDetailById = async (req,res)=>{
    try {
        const response =await PaymentServices.getPaymentById(req.params.id)
        successResponseBody.data = response
        successResponseBody.message = "Successfully fetched the booking and payment"
        return res.status(200).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
        
    }
}

module.exports ={
    create , getPaymentDetailById
}