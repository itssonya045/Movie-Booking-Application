
const USER_ROLE = {
  customer: "CUSTOMER",
  admin: "ADMIN",
  client: "CLIENT"
};

const USER_STATUS = {
  approved: "APPROVED",
  pending: "PENDING",
  rejected: "REJECTED"
};

const BOOKING_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESSFUL: "SUCCESSFUL",
  CANCEL: "CANCEL"
}; 

const PAYMENT_STATUS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

module.exports = {
USER_ROLE, USER_STATUS, BOOKING_STATUS,PAYMENT_STATUS
}