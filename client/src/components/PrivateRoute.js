import React, { useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {

    let auth = { "token": true }
    
    useEffect(() => {
      
    }, [])

    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}
