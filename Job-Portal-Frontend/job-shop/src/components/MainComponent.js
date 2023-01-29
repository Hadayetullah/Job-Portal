import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import MyJobs from './MyJobs';
import ResponsiveAppBar from './Navbar';
import ViewCV from './ViewCV';
import Register from './auth/Register';
import Login from './auth/Login';
import LogOut from './auth/Logout';
import CreateCV from './CreateCV';
import PrivateRoutes from './PrivateRoutes';

class MainComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            isAuthenticated: false,
            icon: null,
            userId: null,
            expirationTime: null,

        }
    }
    

    authCheck = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Logout
            this.setState({isAuthenticated: false})
        } else {
            const expirationTime = new Date(localStorage.getItem("expirationTime"));
            if (expirationTime <= new Date()) {
                // Logout
                this.setState({isAuthenticated: false})
            } else {
                // Login
                const userId = localStorage.getItem("userId");
                this.setState({
                    isAuthenticated: true,
                    expirationTime: expirationTime,
                    userId: userId,
                })

            }
        }
    }

    onResponsiveIcon = item => {
        if(this.state.isAuthenticated === false){
            if(item === "login"){
                this.setState({
                    icon: item,
                })
            } else {
                this.setState({
                    icon: item,
                })
            }
        }
    }




    render(){
        return (
            <div>
                <ResponsiveAppBar isAuthenticated={this.state.isAuthenticated} icon={this.state.icon} />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/' exact element={<Dashboard authCheck={this.authCheck} />} />
                        <Route path='myjobs' element={<MyJobs authCheck={this.authCheck} />} />
                        <Route path='/viewcv' element={<ViewCV authCheck={this.authCheck} />} />
                        <Route path='/create_cv' element={<CreateCV authCheck={this.authCheck} />} />
                        <Route path='/logout' element={<LogOut />} />
                        <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    </Route>
                    
                    <Route path='/login' element={<Login onResponsiveIcon={this.onResponsiveIcon} />} />
                    <Route path='/register' element={<Register onResponsiveIcon={this.onResponsiveIcon} />} />
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </div>
        );
    }
}

export default MainComponent;
