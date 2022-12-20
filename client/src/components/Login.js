
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext';

export const Login = () => {

  const { loginAccount, setUser, setLoginToken } = useContext(AppContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async  () => {
    await loginAccount({
      email:email,
      password: password
     }).then((response) => {
      if(response.accessToken) {
        setUser(response.user)
        setLoginToken(response.accessToken)
        console.log(response);
        if(response.user.type === "hospital") {
          navigate("/home-hospital")
          return
        }
        navigate("/home")
      }
     })
  }

  return (
    <div>
        <h1>Login</h1>
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
              placeholder='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></input>
        </div>
        <button 
        onClick={() => {
         handleLogin()
        }}
        >Sign in</button>
        <div>
        <p>
        Don't have an account?
            <Link to="/signup">Sign Up</Link>
        </p>
        </div>
    </div>
  )
}
