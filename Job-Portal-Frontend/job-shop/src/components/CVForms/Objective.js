import React, { Component } from 'react';
import { Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';
import axios from 'axios';

class Objective extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            token: null,
            expirationTime: null,
            allData: {
                objective: "",
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
                                new_state[s] = res[s];
                            }
                        }
                    }
                    this.setState({
                        token: token,
                        expirationTime: expirationTime,
                        allData: new_state
                    });
                })
                .catch(err => console.log(err));
            }
        }    
    }



    handleChange = e => {
        this.setState(
            {
                allData: {
                    ...this.state.allData,
                    [e.target.name]: e.target.value,
                }
            }    
        );
    }

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
                    Provide Your Objective Info
                </Typography>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={12} item>
                        <TextField onChange={(e) => this.handleChange(e)} name='objective' value={this.state.allData.objective} type={"text"} multiline rows={5} label="Objective" placeholder='Write down your objective' variant='outlined' fullWidth />
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default Objective;
