const { Transaction } = require("./../model")

const getTransactionHistory = async (req, res) => {
    const transactions = await Transaction.find();
    console.log(transactions);
    res.status(200).json({ transactions: transactions })
}

const createTransaction = async (req,res) => {
    const transaction = await Transaction.create(req.body)
    console.log(transaction);
    return res.status(200).json({ transaction: transaction})
}

module.exports = { getTransactionHistory, createTransaction }
