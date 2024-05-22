const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open",() => {
  console.log("MogoDb is connected successfully");
});

const corsOptions = {
  origin: '*' // Allow requests from all origins
};

app.use(cors(corsOptions)); // Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware for CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next(); // Pass control to the next middleware
});

// Routes
require("./app/routes/animal.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/horaire.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API Arcadia." });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
