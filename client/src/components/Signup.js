import React from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {
    return (
        <div>
            <h1>Signup</h1>
            <div>
                <label>Email</label>
                <input placeholder='email'></input>
            </div>
            <div>
                <label>Password</label>
                <input placeholder='email'></input>
            </div>
            <button>Sign in</button>
            <div>
                <p>
                    Don't have an account?
                    <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
