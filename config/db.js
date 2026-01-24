const mongoose = require("mongoose");

const connectDB = async (app) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mba_DB");
    console.log("Connected Database...!");

    
    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

module.exports = connectDB;

