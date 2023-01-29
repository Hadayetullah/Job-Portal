import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, } from '@mui/material';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import {Navigate} from 'react-router-dom';



class Certificates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            token: null,
            expirationTime: null,
            allData: {
                vendorName: "",
                certificateTopic: "",
                certificateScore: "",
                idNo: "",
                certificateFile: "",
                certificationDate: new Date(),
                expireDate: new Date(),
                certificateCheck: true,
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
                                if(s === "certificationDate"){
                                    if(res[s] === null || res[s] === ''){
                                        new_state[s] = new Date();
                                    } else {
                                        new_state[s] = new Date(res[s]);
                                    }
                                } else if(s === "expireDate"){
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


    handleImageChange = e => {
        this.setState({
            allData: {
                ...this.state.allData,
                [e.target.name]: e.target.files[0],
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
        if (f === "certificationDate") {
            name = "certificationDate";
        } else {
            name = "expireDate"
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
                if((s === "certificateFile")){
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
                    Provide Your Certification Info
                </Typography>
                <Grid container spacing={2}>

                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="vendorName" value={this.state.allData.vendorName} type={"text"} label="Vendor Name" placeholder='Vendor Name' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="certificateTopic" value={this.state.allData.certificateTopic} type={"text"} label="Subject/Topic/Exam" placeholder='Subject/Topic/Exam' variant='outlined' fullWidth />
                    </Grid>

                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="certificateScore" value={this.state.allData.certificateScore} type={"text"} label="Score" placeholder='Score' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="idNo" value={this.state.allData.idNo} type={"text"} label="Certificate ID No." placeholder='Certificate ID No.' variant='outlined' fullWidth />
                    </Grid>


                    <Grid xs={12} sm={12} item>
                        <Typography variant='body1' component={"p"}>Please choose your certificate file here</Typography>
                        <Button
                            onChange={(e) => this.handleImageChange(e)}
                            value={this.state.allData.certificateFile}
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{
                                color: "#777",
                                border: "1px solid #C4C4C4",
                                fontWeight: "bold",
                                height: "55px",
                                textAligh: "left",
                                justifyContent: "left",
                            }}
                        >
                            <input
                                name="certificateFile"
                                type="file"
                                style={{ fontSize: "17px" }}
                            />
                        </Button>
                    </Grid>


                    <Grid xs={6} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack>
                                <DesktopDatePicker
                                    label="Certification Date"
                                    name="certificationDate"
                                    inputFormat="MM/DD/YYYY"
                                    value={this.state.allData.certificationDate}
                                    onChange={(e) => this.handleDateChange(e, "certificationDate")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>


                    <Grid xs={6} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack>
                                <DesktopDatePicker
                                    label="Expire Date"
                                    name="expireDate"
                                    inputFormat="MM/DD/YYYY"
                                    value={this.state.allData.expireDate}
                                    onChange={(e) => this.handleDateChange(e, "expireDate")}
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
                            label="Don't have expiry date"
                            sx={{ marginLeft: "10px" }}
                            control={
                                <Checkbox
                                    name='certificateCheck'
                                    checked={this.state.allData.certificateCheck}
                                    onChange={(e) => this.handleCheckField(e)}
                                />
                            }
                        />
                    </Grid>

                    <Grid xs={12} sm={12} item>
                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}





export default Certificates;