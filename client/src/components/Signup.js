import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './AppContext';

export const Signup = () => {

    const { createAccount } = useContext(AppContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(false)
    
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
                        await createAccount(
                            {
                                email: email,
                                password: password
                            }
                        )
                    }
                }
                >Sign up
            </button>
            <div>
                <p>
                    Don't have an account?
                    <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
