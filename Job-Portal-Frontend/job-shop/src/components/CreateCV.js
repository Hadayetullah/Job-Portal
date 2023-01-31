import { Card, CardContent, Grid, Typography} from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';

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
            PersonalInfo: true,
            Objective: false,
            Educations: false,
            WorkExperience: false,
            Certificates: false,
            Training: false,
            Skills: false,
            active: "PersonalInfo"
        }
    }


    loadForm = arg => {
        let oldState = this.state;
        let newState = {};
        for (let a in oldState) {
            if (a !== arg) {
                if(a !== "active"){
                    newState[a] = false;
                } else {
                    newState["active"] = arg;
                }
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

        const list = [PersonalInfo, Objective, Educations, WorkExperience, Certificates, Training, Skills]
        const titles = [
            {title:"Personal Information", paramtr: "PersonalInfo"},
            {title:"Objective", paramtr: "Objective"},
            {title:"Educations", paramtr: "Educations"},
            {title:"Work Experience", paramtr: "WorkExperience"},
            {title:"Certificates", paramtr: "Certificates"},
            {title:"Training", paramtr: "Training"},
            {title:"Skills", paramtr: "Skills"}
        ];
        

        let style = {
            backgroundColor: "#1976D2",
            color: "#ffffff",
        }

        let form = null;
        for(let key in this.state){
            if(this.state[key] === true){
                for(let i in list){
                    if(key === list[i].name){
                        let FormComponent = list[i];
                        form = <FormComponent />
                    }
                }
            }
        }


        const listItems = titles.map((item, index)=>{
            return(
                <Box onClick={() => this.loadForm(item.paramtr)}
                    key={index}
                    sx={{
                        minWidth: "200px",
                        margin: "5px 0",
                        boxShadow: "0 1px 3px -1px",
                        textAlign: "left",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontFamily: "poppins, sans-serif",
                        lineHeight: "2",
                        padding: "5px 0",
                        backgroundColor: `${item.paramtr === this.state.active ? style.backgroundColor : "#fff"}`
                    }}>

                    <Typography variant='h6'
                        sx={{ 
                            color: `${item.paramtr === this.state.active ? style.color : "#888888"}`,
                            paddingLeft: "7%" 
                        }}>
                        {item.title}
                    </Typography>
                </Box>
            )
        })
        


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
                                {listItems}
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