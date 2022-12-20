const db = require("./database")
const { createTransaction } = require("./controllers/transactions")
const { Address, Transaction } = require("./model")


db.connectDB();

const addresses = [
    "ylakf8asof8n283un82un8fyqnyu83qy8fi3qn2hasdiufhoa8h",
    "loikf8asof8n283un82un8fyqnyu8309845joui2nlitnqu2n8y",
    "9oad8f79adshfna3o87h3a8ofnawn8ya8nfa8yn8yfnao8nf8oy",
    "aojnfao97f8a657ab3a53bn0a937a38yna8n08amh8m38a08a7f"
  ]

const currentTransactions = [
    {
      receiptHash: "0x39ae0a30kljaldkfa909012934j3i029iealjnfdkajnfdfadsf",
      status: "SUCCESS",
      timestamp: Date.now() - 10000,
      source: addresses[1],
      destination: addresses[3],
      amount: 250,
      currency: "ETH",
      gasUsed: 21000
    },
    {
      receiptHash: "0x39ae0a30kljaldkfa909012934j3i029iealjnfdkajnfdfadsf",
      status: "SUCCESS",
      timestamp: Date.now() - 30000,
      source: addresses[1],
      destination: addresses[3],
      amount: 250,
      currency: "ETH",
      gasUsed: 25000
    },
    {
      receiptHash: "0x39ae0a30kljaldkfa909012934j3i029iealjnfdkajnfdfadsf",
      status: "SUCCESS",
      timestamp: Date.now() - 50000,
      source: addresses[3],
      destination: addresses[2],
      amount: 250,
      currency: "ETH",
      gasUsed: 30000
    },
    {
      receiptHash: "0x39ae0a30kljaldkfa909012934j3i029iealjnfdkajnfdfadsf",
      status: "SUCCESS",
      timestamp: Date.now() - 100000,
      source: addresses[2],
      destination: addresses[1],
      amount: 250,
      currency: "ETH",
      gasUsed: 30000
    },
    {
      receiptHash: "0x39ae0a30kljaldkfa909012934j3i029iealjnfdkajnfdfadsf",
      status: "SUCCESS",
      timestamp: Date.now() - 200000,
      source: addresses[2],
      destination: addresses[0],
      amount: 250,
      currency: "ETH",
      gasUsed: 30000
    },
    {
      receiptHash: "0x39ae0a30kljaldkfa909012934j3i029iealjnfdkajnfdfadsf",
      status: "SUCCESS",
      timestamp: Date.now() - 200000,
      source: addresses[3],
      destination: addresses[1],
      amount: 500,
      currency: "ETH",
      gasUsed: 30000
    }
  ]

const seedDB = async () => {
    const currentAddresses = await Address.find()

    if (currentAddresses.length > 0 ) {
        console.log("data base already seeded")
        return
    }
    
    for(let i =0 ; i < addresses.length; i++) {
        await Address.create({_id:addresses[i]})
    }
   
    for(let i =0 ; i < currentTransactions.length; i++) {
        await Transaction.create(currentTransactions[i])
    }
    console.log("finished seeding");
}

seedDB()