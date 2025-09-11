import React, { Children, useContext } from 'react'
import { LoginContext } from '../Context/LoginContext'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({Children}) => {
  
    let {logged}=useContext(LoginContext);
  
    if (!logged) {
        return <Navigate to={"/"} replace></Navigate>
    }

    return <Outlet></Outlet>;
}
