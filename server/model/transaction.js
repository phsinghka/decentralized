const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  gasUsed: {
    type: Number,
    required: false,
  },
  receiptHash: {
    type: String,
    required: false,
  }
});


const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction