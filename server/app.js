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
 
// Accounts
app.get("/account/addresses", getAddresses)
app.get("/account/balance/:address", getBalance)
app.post("/accounts", createAddress)

app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});

app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return res.status(200).json({ sucess: true, user: user, error:false});
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});

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
 
