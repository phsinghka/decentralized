import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './AppContext';

export const Signup = () => {

    const { createAccount } = useContext(AppContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userWallet, setUserWallet] = useState("");
    const [typeAccount, setTypeAccount] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
     
    return (
        <div>
            <h1>Signup</h1>
            <div>
                <label>Email</label>
                <input 
                    placeholder='email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input 
                    placeholder='email'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                ></input>
            </div>
            <div>
                <label>Password Confirmation</label>
                <input 
                    placeholder='password confirmation'
                    onChange={(e) => {
                        setPasswordConfirmation(e.target.value)
                    }}    
                ></input>
            </div>
            <div>
                <label>Wallet Address</label>
                <input 
                    placeholder='Wallet Address'
                    onChange={(e) => {
                        setUserWallet(e.target.value)
                    }}    
                ></input>
            </div>
            <div>
                <label>Account Type</label>
                <select onChange={(e) => setTypeAccount(e.target.value)}>
                    <option value={"person"}>Person</option>
                    <option value={"hospital"}>Hospital</option>
                </select>
            </div>
            <button
                onClick={
                    async () => {
                        if (email === "" || password === "" || passwordConfirmation === "" ) {
                            setError({message: "Please fill out all the input fields"})
                            return
                        }
                        if (password !== passwordConfirmation) {
                            setError({message: "Password and confirmation do not match"})
                            return
                        }
                        if (userWallet.length < 1) {
                            setError({message: "Wallet is required"})
                            return
                        }
                        await createAccount(
                            {
                                email: email,
                                password: password,
                                wallet: userWallet,
                                type: typeAccount
                            }
                        ).then(response => {
                            if (response.accessToken) {
                                setSuccess(true)
                            }
                        })
                    }
                }
                >Sign up
            </button>
            {
                success ? (
                <div>
                    <div>
                        Thanks for creating you account
                    </div>
                    <Link to={"/"}>Login</Link>
                </div>
                ) : <></>
            }
        </div>
    )
}
