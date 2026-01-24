const express = require("express");
const connectDB = require("./config/db");
const MovieRoutes = require("./routes/movie.routes")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


MovieRoutes(app)
app.get("/home", (req, res) => {
  res.send("conected to database");
});


connectDB(app);

