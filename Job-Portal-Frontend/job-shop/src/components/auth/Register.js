import React, { Component } from 'react';
import { Button, Card, CardContent, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box } from '@mui/system';

import { Navigate } from 'react-router-dom';
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            phone: "",
            dob: new Date(),
            gender: "",
            email: "",
            password: "",
            passwordConfirm: "",
            passwordValid: "",
            isError: false,
            errorValue: null,
            isSuccess: null,
        }
    }


    handleSubmittedForm = event => {
        if (this.state.password === this.state.passwordConfirm) {
            let body = {
                name: this.state.name,
                phone: this.state.phone,
                dob: this.state.dob,
                gender: this.state.gender,
                email: this.state.email,
                password: this.state.password
            }


            axios.post("https://hadayetullah002.pythonanywhere.com/api/user/", body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        this.setState({
                            name: "",
                            phone: "",
                            dob: new Date(),
                            gender: "",
                            email: "",
                            password: "",
                            passwordConfirm: "",
                            passwordValid: "",
                            isError: false,
                            errorValue: null,
                            isSuccess: 201
                        })
                    }
                })
                .catch(err => {
                    if (err != null) {
                        let key = Object.keys(err.response.data)[0];
                        this.setState({
                            passwordValid: "",
                            isError: true,
                            errorValue: err.response.data[key],
                        })
                    }
                })
        } else {
            this.setState({
                passwordValid: "Password doesn't match!"
            })
        }

        event.preventDefault();
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }


    handleDateChange = e => {
        this.setState({
            dob: new Date(e),
        });
    };



    componentDidMount(){
        this.props.onResponsiveIcon("register");
    }


    render() {

        if(this.state.isSuccess === 201){
            return <Navigate to="/login" />
        }

        const error = <Button variant="outlined" color="error" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
            <Typography textAlign={"center"} variant='p'>{this.state.errorValue}</Typography>
        </Button>

        return (
            <Box sx={{ maxWidth: 750, margin: "90px auto" }}>

                {this.state.isError ? error : <div></div>}

                <Card >
                    <CardContent>
                        <Typography textAlign={"center"} variant='h4'>Register</Typography>
                        <Typography textAlign={"center"} gutterBottom marginBottom={3} variant='body2' component="p">Register to apply for a job</Typography>
                        <form onSubmit={(e) => this.handleSubmittedForm(e)}>
                            <Grid container spacing={3}>
                                <Grid xs={12} sm={6} item>
                                    <TextField onChange={(e) => this.handleInputChange(e)} name="name" value={this.state.name} type={"text"} label="Full Name" placeholder='Enter your name' variant='outlined' fullWidth required />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField onChange={(e) => this.handleInputChange(e)} name="phone" value={this.state.phone} type={"number"} label="Phone Number" placeholder='Enter phone number' variant='outlined' fullWidth required />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack>
                                            <DesktopDatePicker
                                                label="Certification Date"
                                                name="dob"
                                                inputFormat="MM/DD/YYYY"
                                                value={this.state.dob}
                                                onChange={(e) => this.handleDateChange(e)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select onChange={(e) => this.handleInputChange(e)} name="gender" value={this.state.gender} type={"text"} label="Gender" variant='outlined' required>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                    <TextField onChange={(e) => this.handleInputChange(e)} name="email" value={this.state.email} type={"email"} label="Email Address" placeholder='Enter email address' variant='outlined' fullWidth required />
                                </Grid>

                                <Grid xs={12} sm={6} item>
                                    <TextField onChange={(e) => this.handleInputChange(e)} name="password" value={this.state.password} type={"password"} label="Password" placeholder='Enter password' variant='outlined' fullWidth required />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField onChange={(e) => this.handleInputChange(e)} name="passwordConfirm" value={this.state.passwordConfirm} type={"password"} label="Confirm Password" placeholder='Enter confirmation password' variant='outlined' fullWidth required />
                                    <Typography variant='body2' color={"red"} component="p">{this.state.passwordValid}</Typography>
                                </Grid>
                                {/* <Grid xs={12} item>
                                <TextField type={"text"} multiline rows={4} label="Objective" placeholder='Write down your objective' variant='outlined' fullWidth />
                            </Grid> */}
                                <Grid xs={12} item>
                                    <Button type='submit' variant='contained' fullWidth>Register</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        );
    }
}


export default Register;