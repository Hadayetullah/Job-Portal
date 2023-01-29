import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';


import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import {Navigate} from 'react-router-dom';




class WorkExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            token: null,
            expirationTime: null,
            allData: {
                organizationName: "",
                departmentName: "",
                positionHeld: "",
                experienceFrom: new Date(),
                experienceTo: new Date(),
                experienceCheck: true,
                responsibility: "",
                achievement: "",
                user: null

            }        
        }
    }



    getExistData = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return <Navigate to="/" />
        } else {
            const expirationTime = new Date(localStorage.getItem("expirationTime"));
            if (expirationTime <= new Date()) {
                return <Navigate to="/" />
            } else {
                const userId = localStorage.getItem("userId");
                let url = "https://hadayetullah002.pythonanywhere.com/api/userinfo/";
                axios.get(url + userId + "/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => {
                    let res = response.data;
                    let total_state = this.state.allData;
                    let new_state = {};
                    for(let s in total_state){
                        for(let t in res){
                            if(s === t){
                                if(s === "experienceFrom"){
                                    if(res[s] === null || res[s] === ''){
                                        new_state[s] = new Date();
                                    } else {
                                        new_state[s] = new Date(res[s]);
                                    }
                                } else if(s === "experienceTo"){
                                    if(res[s] === null || res[s] === ''){
                                        new_state[s] = new Date();
                                    } else {
                                        new_state[s] = new Date(res[s]);
                                    }
                                } else {
                                    new_state[s] = res[s];
                                }
                            }
                        }
                    }
                
                    this.setState({
                        token: token,
                        expirationTime: expirationTime,
                        allData: new_state
                    });
                })
                .catch(err => console.log(err))   
            }
        }     
    }




    handleChange = e => {
        this.setState({
            allData:{
                ...this.state.allData,
                [e.target.name]: e.target.value,
            }
        });
    };


    handleCheckField = e => {
        this.setState({
            allData: {
                ...this.state.allData,
                [e.target.name]: e.target.checked,
            }
        });
    }


    handleDateChange = (e, f) => {
        let name = null;
        if (f === "experienceFrom") {
            name = "experienceFrom";
        } else {
            name = "experienceTo"
        }
        this.setState({
            allData: {
                ...this.state.allData,
                [name]: new Date(e),
            }
        });
    };


    
    
    handleSubmit = e => {
        let body_obj = {};
        let total_state = this.state.allData;

        if(this.state.expirationTime <= new Date()){
            return <Navigate to="/" />
        } else {
            for(let s in total_state){
                if((s === "profilePic")){
                    if(typeof(total_state[s]) != "string"){
                        body_obj[s] = total_state[s];
                    }
                    
                } else {
                    body_obj[s] = total_state[s];
                }
            }
        }

        

        const userId = total_state.user;
        const token = this.state.token;

        axios.put(`https://hadayetullah002.pythonanywhere.com/api/userinfo/${userId}/`, body_obj, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        isSuccess: true
                    })
                }
            })
            .catch(err => console.log(err))

        e.preventDefault();
    }



    componentDidMount() {
        this.getExistData();
    }



    render() {

        const success = (
            <Button variant="outlined" color="success" fullWidth sx={{ marginBottom: "10px", fontSize: "17px" }}>
                <Typography textAlign={"center"} variant='p'>Your data has posted successfully!</Typography>
            </Button>
        )

        return (
            <form onSubmit={(e) => this.handleSubmit(e)} style={{ marginRight: "30px" }}>

                {this.state.isSuccess ? success : <div></div>}

                <Typography
                    textAlign={"left"}
                    marginBottom="35px"
                    fontWeight={"bold"}
                    variant='h6'
                    textTransform={"uppercase"}
                    borderBottom={"1px solid #D2D5D8"}
                >
                    Work Experience / Assignment Experience
                </Typography>
                <Grid container spacing={1}>

                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="organizationName" value={this.state.allData.organizationName} type={"text"} label="Organization Name" placeholder='Organization Name' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="departmentName" value={this.state.allData.departmentName} type={"text"} label="Department Name" placeholder='Department Name' variant='outlined' fullWidth />
                    </Grid>

                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="positionHeld" value={this.state.allData.positionHeld} type={"text"} label="Position Held" placeholder='Position Held' variant='outlined' fullWidth />
                    </Grid>


                    <Grid xs={6} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack>
                                <DesktopDatePicker
                                    label="From"
                                    name="experienceFrom"
                                    inputFormat="MM/DD/YYYY"
                                    value={this.state.allData.experienceFrom}
                                    onChange={(e) => this.handleDateChange(e, "experienceFrom")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>


                    <Grid xs={6} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack>
                                <DesktopDatePicker
                                    label="To"
                                    name="experienceTo"
                                    inputFormat="MM/DD/YYYY"
                                    value={this.state.allData.experienceTo}
                                    onChange={(e) => this.handleDateChange(e, "experienceTo")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>


                    <Grid xs={6} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} sx={{ visibility: "hidden" }} />
                    </Grid>
                    <Grid xs={6} sm={6} item>
                        <FormControlLabel
                            label="I am currently working on this role"
                            control={
                                <Checkbox
                                    name='experienceCheck'
                                    onChange={(e) => this.handleCheckField(e)}
                                    checked={this.state.allData.experienceCheck}
                                />
                            }
                        />
                    </Grid>


                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="responsibility" value={this.state.allData.responsibility} type={"text"} multiline rows={5} label="Major Responsibilities" placeholder='Major Responsibilities' variant='outlined' fullWidth />
                    </Grid>


                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="achievement" value={this.state.allData.achievement} type={"text"} multiline rows={5} label="Write Job Achievements" placeholder='Write Job Achievements' variant='outlined' fullWidth />
                    </Grid>

                    <Grid xs={12} sm={12} item>
                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}





export default WorkExperience;