import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AppContext } from './AppContext'

export const PrivateRoutesUser = () => {

    const { loginToken, user } = useContext(AppContext)
    
    return (
        loginToken && user.type === "user" ? <Outlet /> : <Navigate to="/" />
    )
}
