import React, { useContext} from 'react'
import { AppContext } from './AppContext'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
  
    const { logout } =  useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log("login out");
        logout()
        navigate("/")
    }

    return (
    <div>
        <button onClick={ () => handleLogout()}>Logout</button>
    </div>
  )
}

export default LogoutBtn