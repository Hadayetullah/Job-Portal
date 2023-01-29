import React from "react";
import { Navigate } from 'react-router-dom';

const LogOut = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userId");

        return <Navigate to="/" />
    }

export default LogOut;