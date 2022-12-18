const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  }
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = { Address };