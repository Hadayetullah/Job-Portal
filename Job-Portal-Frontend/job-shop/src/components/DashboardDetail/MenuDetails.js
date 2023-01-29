import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';


const MenuDetails = (props) => {
    // console.log(props.item);

    return (

        <Box
            sx={{
                background: "white", margin: "10px 35px 10px 20px", borderRadius: "5px"
            }}
        >
            <Box sx={{ marginLeft: "10px" }}>
                <Grid container sx={{ cursor: "default" }}>
                    <Grid item xs={7}>
                        <Typography sx={{ fontWeight: "bold", color: "#555", padding: "4px 0", height: "100%" }}>
                            {props.item}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Box width={"100%"} height="100%">
                            <Box
                                sx={{
                                    width: "100px",
                                    height: "29px",
                                    float: "right",
                                    border: "1px solid #CCCCCC",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    paddingTop: "5px"


                                }}>
                                <Link to="/create_cv" state={{ jobTitle: `${props.item}` }}
                                    style={{
                                        // display: "flex",
                                        // float: "right",
                                        // marginTop: "5px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        color: "#626262",
                                        textDecoration: "none",

                                        // height: "32px"
                                    }}
                                >
                                    APPLY NOW
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>


            </Box>
        </Box>


    );
}

export default MenuDetails;