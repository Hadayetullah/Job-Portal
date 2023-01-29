import React from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/system';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            auth: null,
            errMsg: null,
        }
    }
    

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmittedForm = event => {
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("https://hadayetullah002.pythonanywhere.com/api/token/", body, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                const token = response.data.access;
                const decoded = jwt_decode(token);
                const expTime = decoded.exp;
                const user_id = decoded.user_id;

                const expirationTime = new Date(expTime * 1000);

                if (response.status === 200) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("userId", user_id);
                    localStorage.setItem("expirationTime", expirationTime);

                    this.setState({
                        auth: 200,
                    })
                }
            })
            .catch(err => {
                let error = err.response;
                if(error.status === 401){
                    this.setState({
                        errMsg: "Invalid email or password!",
                    })
                }
            })
        event.preventDefault();
    }


    componentDidMount(){
        this.props.onResponsiveIcon("login");
    }


    render(){

        if (this.state.auth === 200) {
            return <Navigate to="/" />;
        }

        const error = (
            <Button variant="outlined" color="error" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
                <Typography textAlign={"center"} variant='p'>{this.state.errMsg}</Typography>
            </Button>
        )

        return (
            <div>
                <Box sx={{ marginTop: "100px" }}>

                    <Box sx={{ maxWidth: 450, margin: "0 auto" }}>
                        {this.state.errMsg != null ? error : <div></div>}
                    </Box>

                    <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
                        <CardContent>
                            <Typography textAlign={"center"} variant='h4'>Login</Typography>
                            <Typography textAlign={"center"} gutterBottom marginBottom={3} variant='body2' component="p">Provide necessary information</Typography>
                            <form onSubmit={(e) => this.handleSubmittedForm(e)}>
                                <Grid container spacing={1}>
                                    <Grid xs={12} item>
                                        <TextField onChange={(e)=>this.handleChange(e)} name="email" value={this.state.email} type={"email"} label="Email Address" placeholder='Enter email address' variant='outlined' fullWidth required />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField onChange={(e)=>this.handleChange(e)} name="password" value={this.state.password} type={"password"} label="Password" placeholder='Enter password' variant='outlined' fullWidth />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Button type='submit' variant='contained' fullWidth>Login</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        );
    }
}


export default Login;