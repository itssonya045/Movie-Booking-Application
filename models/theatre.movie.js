const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
  name: {
  type: String,
  required: true,
  trim: true,
  minlength: 3,
  match: [/^[A-Za-z\s]+$/, "Name must contain only letters"]
},

    description: {
      type: String,
      trim: true
    },

    pincode: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
