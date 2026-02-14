const Booking = require("../models/booking.model");
const { BOOKING_STATUS, PAYMENT_STATUS } = require("../utils/constant");
const Payment = require("../models/payment.model")


const createPayment = async (data) => {

  const booking = await Booking.findById(data.bookingId);
  if(booking.status === BOOKING_STATUS.SUCCESSFUL){
    throw{
        err : "Booking already done , cannot make the payment again",
        code : 400
    }
  }

  if (!booking) {
    throw { err: "No booking found", status: 404 };
  }

  const bookingTime = booking.createdAt.getTime();
  const currentTime = Date.now();
  const minutes = Math.floor((currentTime - bookingTime) / (1000 * 60));

  if (minutes > 5) {
    booking.status = BOOKING_STATUS.EXPIRED;
    await booking.save();
    throw { err: "Booking expired", status: 400 };
  }

  const payment = await Payment.create({
    bookingId: data.bookingId,
    amount: data.amount
  });

  if (payment.amount !== booking.totalCost) {
    payment.status = PAYMENT_STATUS.FAILED;
    await payment.save();

    booking.status = BOOKING_STATUS.CANCELLED;
    await booking.save();

    throw { err: "Payment failed", status: 400 };
  }

  payment.status = PAYMENT_STATUS.SUCCESS;
  await payment.save();

  booking.status = BOOKING_STATUS.SUCCESSFUL;
  await booking.save();

  return booking;
};

const getPaymentById = async (id)=>{
    try {
        
        const respose = await Payment.findById(id).populate("bookingId")
        if(!respose){
            throw{
                err : "No payment are found this id",
                code : 404
            }
        }
        return respose
    } catch (error) {
        throw error
    }
}



module.exports = {
    createPayment , getPaymentById
}