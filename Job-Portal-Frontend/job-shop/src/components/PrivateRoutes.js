import React from "react";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = () =>{

    let isAuthenticated = null;
    
    const token = localStorage.getItem("token");
    if (!token) {
        // Logout
        isAuthenticated = false;
    } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime"));
        if (expirationTime <= new Date()) {
            // Logout
            isAuthenticated = false;
        } else {
            // Login
            isAuthenticated = true;

        }
    }


    // console.log("Private Routes");


    
    return(
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;