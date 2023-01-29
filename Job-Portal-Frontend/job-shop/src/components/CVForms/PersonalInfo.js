import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';


import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';



class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            token: null,
            expirationTime: null,
            allData: {
                fullName: "",
                infoDob: new Date(),
                phone: "",
                nationality: "",
                nid: "",
                gender: "",
                address: "",
                profilePic: "",
                user: null,
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
                                if(s === "infoDob"){
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

        

        const token = this.state.token;
        const userId = body_obj.user;
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

        // const token = localStorage.getItem("token");
        // if (!token) {
        //     // Logout
        // } else {
        //     const expirationTime = new Date(localStorage.getItem("expirationTime"));
        //     if (expirationTime <= new Date()) {
        //         // Logout
        //     } else {
        //         const userId = localStorage.getItem("userId");

        //         let form_data = new FormData();
        //         form_data.append("fullName", this.state.fullName);
        //         form_data.append("infoDob", this.state.infoDob);
        //         form_data.append("phone", this.state.phone);
        //         form_data.append("nationality", this.state.nationality);
        //         form_data.append("nid", this.state.nid);
        //         form_data.append("gender", this.state.gender);
        //         form_data.append("address", this.state.address);
        //         form_data.append("profilePic", this.state.profilePic);
        //         form_data.append("user", userId);

        //         axios.post("http://127.0.0.1:8000/api/create/", form_data, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             }
        //         })
        //             .then(response => console.log(response))
        //             .catch(err => console.log(err))


        //     }
        // }

        e.preventDefault();
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


    handleDateChange = e => {
        this.setState({
            allData: {
                ...this.state.allData,
                infoDob: new Date(e),
            }
        });
    };



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
                    Provide Your Personal Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="fullName" value={this.state.allData.fullName} type={"text"} label="Full Name" placeholder='Full Name' variant='outlined' fullWidth />
                    </Grid>


                    <Grid xs={12} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack>
                                <DesktopDatePicker
                                    label="Date of Birth"
                                    name="infoDob"
                                    inputFormat="MM/DD/YYYY"
                                    value={this.state.allData.infoDob}
                                    onChange={(e) => this.handleDateChange(e)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>




                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="phone" value={this.state.allData.phone} type={"number"} label="Phone Number" placeholder='Phone Number' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="nationality" value={this.state.allData.nationality} type={"text"} label="Nationality" placeholder='Nationality' variant='outlined' fullWidth />
                    </Grid>

                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="nid" value={this.state.allData.nid} type={"text"} label="NID" placeholder='National ID' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select onChange={(e) => this.handleChange(e)} name="gender" value={this.state.allData.gender} type={"text"} label="Gender" variant='outlined'>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField onChange={(e) => this.handleChange(e)} name="address" value={this.state.allData.address} type={"text"} label="Address" placeholder='Address' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Button
                            onChange={(e) => this.handleImageChange(e)}
                            variant="outlined"
                            component="label"
                            value={this.state.allData.profilePic}
                            fullWidth
                            sx={{
                                color: "#777",
                                border: "1px solid #C4C4C4",
                                fontWeight: "bold",
                                height: "55px",
                            }}
                        >
                            Upload Profile Picture
                            <input
                                name="profilePic"
                                type="file"
                                hidden
                            />
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default PersonalInfo;