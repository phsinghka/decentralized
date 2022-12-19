
const createAccount = async (account) => {
    const parsedBody = JSON.stringify(account)
    const response = await fetch( "http://localhost:4000/register", {
        method: "POST",
        body: parsedBody,
        headers: {
            "Content-Type": "application/json",
        }
    })
    
    const body = await response.json();
    console.log(body);
};

const loginAccount = async (account) => {
    const parsedBody = JSON.stringify(account)
    const response = await fetch( "http://localhost:4000/login", {
        method: "POST",
        body: parsedBody,
        headers: {
            "Content-Type": "application/json",
        }
    })
    
    const body = await response.json();
    console.log(body);
};

module.exports = { createAccount };