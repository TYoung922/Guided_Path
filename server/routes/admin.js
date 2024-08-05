const express = require("express");
const router = express.Router();
const Client = require("../models/Clients");
const Admin = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const adminLayout = "../views/layouts/admin-dash";
const clientLayout = "../views/layouts/admin-client";
// const connectDB = require("../config/db")

//  check for login Middleware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//Admin log in
// GET - check login
router.get("/admin", async (req, res) => {
  try {
    res.render("layouts/login", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

//POST - log in
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Sorry you are not an Admin" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/// POST / register
// Admin create new admin
router.post("/admin/register", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { username, password } = req.body;

    // Log the received request body
    console.log("Request body:", req.body);

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const admin = await Admin.create({
        username,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User created successfully", admin });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(500).json({ message: "User already Exists!" });
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong with the server!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get full waitlist / admin dashboard

router.get("/admin/dashboard", authMiddleware, async (req, res) => {
  try {
    const data = await Client.find();
    res.render("layouts/admin-dash", {
      data,
      layout: adminLayout,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get client by ID
router.get("/admin/client/:id", authMiddleware, async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Client.findById({ _id: slug });

    res.render("layouts/admin-client", { data, layout: clientLayout });
  } catch (error) {
    rest.status(500).send(err);
  }
});

// delete client
router.delete("/delete-client/:id", authMiddleware, async (req, res) => {
  try {
    await Client.deleteOne({ _id: req.params.id });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Log Out
router.get("/admin/logout", authMiddleware, async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
