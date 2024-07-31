const express = require("express");
const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static(__dirname + "/public"));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/wait_list.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
