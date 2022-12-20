const jwt = require('jsonwebtoken');
const fs = require('fs')

const generateToken = (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256'});
    return token
};

module.exports = { generateToken }
