const PaymentController = require("../controllers/payment.controller")
const verifyPaymentRequest = require("../middlewares/payment.middleware")
const { isAuthenticated } = require("../middlewares/auth.middleware")
const routes = (app)=>{
    app.post("/mba/api/v1/payment" ,isAuthenticated , verifyPaymentRequest ,PaymentController.create)
    app.get("/mba/api/v1/payment/:id" , isAuthenticated , PaymentController.getPaymentDetailById)
}

module.exports = routes