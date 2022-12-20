const express=require('express');
const bodyParser=require('body-parser');
const cors = require("cors")
require("dotenv").config(); 
const db = require("./database")
const fs = require("fs")
const jwt = require('jsonwebtoken');
const { getTransactionHistory, createTransaction } = require("./controllers/transactions")
const { getAddresses, getBalance, createAddress } = require("./controllers/addresses")
const port=4000;
const app=express();
const auth = require("./middleware/auth");

const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const { isAuthenticated } = require('./middleware/auth');
const User = require('./model/user');

db.connectDB();

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
// Parses the text as json
app.use(bodyParser.json());


// ROUTERS
app.use("/auth", require("./routes/auth"));

// Accounts
app.get("/account/addresses", getAddresses)
app.get("/account/balance/:address", getBalance)
app.post("/accounts", createAddress)

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// let's first add a /secret api endpoint that we will be protecting
app.get('/secret', (req, res) => {
    console.log("CHECK IT OUT")
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
})

// Transactions
app.get("/transaction/history", getTransactionHistory)
app.post("/transactions", createTransaction)

app.listen(port, function() {
    console.log("Server is listening at port: " + port);
});
 
