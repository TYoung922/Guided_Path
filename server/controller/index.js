const { ObjectId } = require("mongodb");
const mongodb = require("../config/db");
const objectId = require("mongodb").ObjectId;

const test = async (req, res) => {
  try {
    const client = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      whoFor: req.body.selfChild,
      // service: req.body.service,
      conflict: req.body.conflict,
      paymentMethod: req.body.payment,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("waitlisters")
      .insertOne(client);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while creating student.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const tooeleTech = (Req, res) => {
  res.json("Tooele Tech is Awesome!");
};

const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("waitlisters").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createWaitlistUser = async (req, res) => {
  try {
    const client = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      whoFor: req.body.selfChild,
      // service: req.body.service,
      conflict: req.body.conflict,
      paymentMethod: req.body.payment,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("waitlisters")
      .insertOne(client);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while creating student.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("studentInfo")
      .insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while creating student.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  test,
  tooeleTech,
  createWaitlistUser,
  createStudent,
  getAllStudents,
};
