const express = require("express");
const router = express.Router();
const Post = require("../models/Clients");
const Admin = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
