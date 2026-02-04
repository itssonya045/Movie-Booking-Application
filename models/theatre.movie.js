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

    city : {
      type: String,
      trim: true,
      required : true
    },
    movies :{
      type : [mongoose.Schema.Types.ObjectId],
      ref : 'Movie'
    }
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
