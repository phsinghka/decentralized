import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AppContext } from './AppContext'

export const PrivateRoutesHospital = () => {

    const { loginToken, user } = useContext(AppContext)

    return (
        loginToken && user.type === "hospital"  ? <Outlet /> : <Navigate to="/" />
    )
}
