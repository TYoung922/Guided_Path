const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ClientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  whoFor: {
    type: String,
  },
  service: {
    type: Array,
  },
  conflict: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
});

module.exports = mongoose.model("client", ClientSchema);
