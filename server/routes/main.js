const express = require("express");
const router = express.Router();
const Client = require("../models/Clients");
// const Admin = require("../models/user");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

// get / Admin - Check Login

// router.get();

// POST New Clients

router.post("/waitlist", async (req, res) => {
  try {
    console.log(res.body);
    try {
      const newClient = new Client({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        whoFor: req.body.selfChild,
        service: req.body.service,
        conflict: req.body.conflict,
        paymentMethod: req.body.payment,
      });
      await Client.create(newClient);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
