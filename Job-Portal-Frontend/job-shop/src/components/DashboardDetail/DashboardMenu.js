import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MenuDetails from './MenuDetails';


const DashboardMenu = (props) =>{

    let icon = <AddIcon sx={{ fontSize: "30px", color: "#626262", marginBottom: "-10px" }} />;
    let detail = null;
    if (props.expanded === true) {
        icon = <RemoveIcon sx={{ fontSize: "30px", color: "#626262", marginBottom: "-10px" }} />;
        detail = props.item.detail.map(i => {
            return (
                <MenuDetails key={i} item={i} />
            );
        });
    }

    return (
        <Box 
            border="2px solid #ACACAC"
            maxWidth="960px"
            margin="auto"
            marginBottom={1}
            borderRadius="5px"
            overflow="hidden"
            backgroundColor="#F5F5F5"
            sx={{ padding: "0px" }}

        >
            <Box onClick={props.isExpanded} sx={{ width: "100%", display: "inline-flex", margin: "8px 0px 7px 20px", cursor: "pointer" }}>
                <Box
                    sx={{ float: "left", width: "70%" }}>
                    <Typography fontSize="19px" fontWeight="bolder" color="#626262" sx={{}}>
                        {props.item.title}
                    </Typography>
                </Box>

                <Box
                    sx={{ float: "right", width: "30%", marginRight: "35px" }}>
                    <Typography textAlign="right">
                        {icon}
                    </Typography>
                </Box>

            </Box>
            {detail}
        </Box>
    );
}

export default DashboardMenu;