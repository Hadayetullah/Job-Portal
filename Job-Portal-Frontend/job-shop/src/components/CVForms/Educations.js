import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';


import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import axios from 'axios';
import {Navigate} from 'react-router-dom';



class Educations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            token: null,
            expirationTime: null,
            allData: {
                educationLevel: "",
                degreeTitle: "",
                instituteName: "",
                educationSubject: "",
                graduationYear: new Date(),
                duration: "",
                score: "",
                outOfScore: "",
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
                                if(s === "graduationYear"){
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
            allData: {
                ...this.state.allData,
                [e.target.name]: e.target.value,
            }
        });
    };


    handleDateChange = e => {
        this.setState({
            allData: {
                ...this.state.allData,
                graduationYear: new Date(e),
            }
        });
    };


   
    
    handleSubmit = e => {
        const body = this.state.allData;
        const token = this.state.token;
        const userId = body.user;

        if(this.state.expirationTime <= new Date()){
            return <Navigate to="/" />
        } else {
            axios.put(`https://hadayetullah002.pythonanywhere.com/api/userinfo/${userId}/`, body, {
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

        }

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
                    Provide Your Academic Info
                </Typography>
                <Grid container spacing={1} sx={{}}>
                    <Grid xs={12} sm={6} item>
                        <FormControl fullWidth>
                            <InputLabel>Education Level</InputLabel>
                            <Select onChange={(e) => this.handleChange(e)} name="educationLevel" value={this.state.allData.educationLevel} type={"text"} label="Education Level" variant='outlined'>
                                <MenuItem value="Secondary">Secondary</MenuItem>
                                <MenuItem value="Higher Secondary / Equivalent">Higher Secondary / Equivalent</MenuItem>
                                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                                <MenuItem value="Graduation">Graduation</MenuItem>
                                <MenuItem value="Post Graduation">Post Graduation</MenuItem>
                                <MenuItem value="PhD">PhD</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <FormControl fullWidth>
                            <InputLabel>Degree Title</InputLabel>
                            <Select onChange={(e) => this.handleChange(e)} name="degreeTitle" value={this.state.allData.degreeTitle} type={"text"} label="Degree Title" variant='outlined'>
                                <MenuItem value="B.Sc">B.Sc</MenuItem>
                                <MenuItem value="BA">BA</MenuItem>
                                <MenuItem value="Honours">Honours</MenuItem>
                                <MenuItem value="Degree">Degree</MenuItem>
                                <MenuItem value="Fazil">Fazil</MenuItem>
                                <MenuItem value="BSS">BSS</MenuItem>
                                <MenuItem value="B.Com">B.Com</MenuItem>
                                <MenuItem value="B.Tech">B.Tech</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="instituteName" value={this.state.allData.instituteName} type={"text"} label="Institute Name" placeholder='Institute Name' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="educationSubject" value={this.state.allData.educationSubject} type={"text"} label="Subject/Group/Major" placeholder='Subject/Group/Major' variant='outlined' fullWidth />
                    </Grid>


                    <Grid xs={12} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack>
                                <DesktopDatePicker
                                    label="Graduation Year"
                                    name="graduationYear"
                                    inputFormat="MM/DD/YYYY"
                                    value={this.state.allData.graduationYear}
                                    onChange={(e) => this.handleDateChange(e)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>


                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="duration" value={this.state.allData.duration} type={"integer"} label="Duration" placeholder='Duration' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="score" value={this.state.allData.score} type={"float"} label="Score/GPA/CGPA" placeholder='Score/GPA/CGPA' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="outOfScore" value={this.state.allData.outOfScore} type={"float"} label="Score out of" placeholder='Score out of' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}





export default Educations;