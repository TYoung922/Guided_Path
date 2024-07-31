const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
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

// Handle form submission
app.post("/send-email", (req, res) => {
  const { fullName, email, phone, selfChild, service, conflict, payment } =
    req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.email_user,
      pass: process.env.email_pass,
    },
  });

  const mailOptions = {
    from: "orickteen@hotmail.com",
    to: "thyoung89@gmail.com",
    subject: "New Form Submission",
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nWho is it for: ${selfChild}\nServices Wanted: ${service}\nConflicts: ${conflict}\nHow will you pay: ${payment}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error while sending email: " + error);
    }
    res.send("Email sent successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
