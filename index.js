const express = require("express");
const connectDB = require("./config/db");
const MovieRoutes = require("./routes/movie.routes")
const TheatreRoutes = require("./routes/theatre.routes")
const authRoutes = require("./routes/auth.route")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


MovieRoutes(app)
TheatreRoutes(app)
authRoutes(app)
app.get("/home", (req, res) => {
  res.send("conected to database");
});


connectDB(app);

