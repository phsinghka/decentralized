
const createAccount = async (account) => {
    const parsedBody = JSON.stringify(account)
    const response = await fetch( "http://localhost:4000/auth/signup", {
        method: "POST",
        body: parsedBody,
        headers: {
            "Content-Type": "application/json",
        }
    })
    
    const body = await response.json();
    return body
};

const loginAccount = async (account) => {
    const parsedBody = JSON.stringify(account)
    console.log(parsedBody);
    const response = await fetch( "http://localhost:4000/auth/login", {
        method: "POST",
        body: parsedBody,
        headers: {
            "Content-Type": "application/json",
        }
    })
    
    const body = await response.json();
    return body
};

module.exports = { createAccount, loginAccount };