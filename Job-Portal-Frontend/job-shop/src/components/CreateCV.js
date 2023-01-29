import { Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

import PersonalInfo from './CVForms/PersonalInfo';
import Objective from './CVForms/Objective';
import Educations from './CVForms/Educations';
import WorkExperience from './CVForms/WorkExperience';
import Certificates from './CVForms/Certificates';
import Training from './CVForms/Training';
import Skills from './CVForms/Skills';


class CreateCV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalInfo: true,
            objective: false,
            educations: false,
            workExperience: false,
            certificates: false,
            training: false,
            skills: false,
        }

    }


    loadForm = arg => {
        let oldState = this.state;
        let newState = {};
        for (let a in oldState) {
            if (a != arg) {
                newState[a] = false;
            } else {
                newState[a] = true;
            }
        }
        if (this.state.arg != true) {
            this.setState(newState);
        }
    }



    componentDidMount(){
        this.props.authCheck();
    }



    render() {

        let form = null;
        if (this.state.personalInfo === true) {
            form = <PersonalInfo />
        } else if (this.state.objective === true) {
            form = <Objective />
        } else if (this.state.educations === true) {
            form = <Educations />
        } else if (this.state.workExperience === true) {
            form = <WorkExperience />
        } else if (this.state.certificates === true) {
            form = <Certificates />
        } else if (this.state.training === true) {
            form = <Training />
        } else if (this.state.skills === true) {
            form = <Skills />
        }



        return (
            <Box
                sx={{
                    padding: "20px 10px",
                    overflow: "hidden",
                    display: "block",
                    marginTop: "70px",

                }}>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} md={5} item>
                        <Card sx={{ minWidth: "295px", maxWidth: "85%", margin: "0 auto" }}>
                            <CardContent sx={{ width: "80%", marginLeft: "6%" }}>


                                <Box onClick={() => this.loadForm("personalInfo")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Personal Information
                                    </Typography>
                                </Box>
                                <Box onClick={() => this.loadForm("objective")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Objective
                                    </Typography>
                                </Box>
                                <Box onClick={() => this.loadForm("educations")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Educations
                                    </Typography>
                                </Box>
                                <Box onClick={() => this.loadForm("workExperience")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Work Experience
                                    </Typography>
                                </Box>
                                <Box onClick={() => this.loadForm("certificates")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Certificates
                                    </Typography>
                                </Box>
                                <Box onClick={() => this.loadForm("training")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Training
                                    </Typography>
                                </Box>
                                <Box onClick={() => this.loadForm("skills")}
                                    sx={{
                                        minWidth: "200px",
                                        margin: "5px 0",
                                        boxShadow: "0 1px 3px -1px",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontFamily: "poppins, sans-serif",
                                        lineHeight: "2",
                                        padding: "5px 0"

                                    }}>

                                    <Typography variant='h6'
                                        sx={{ color: "#888888", paddingLeft: "7%" }}>
                                        Skills
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>



                    <Grid xs={12} sm={6} md={7} item>
                        {form}
                    </Grid>
                </Grid>
            </Box >
        );
    }
}


export default CreateCV;