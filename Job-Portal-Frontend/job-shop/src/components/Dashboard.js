import React, { Component } from 'react';
import Box from '@mui/material/Box';
import DashboardMenu from './DashboardDetail/DashboardMenu';
import DashboardData from './DashboardData';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardData: DashboardData,
            componentExpanded: null,
        }
    }


    isExpanded = index =>{
        if(this.state.componentExpanded === index){
            this.setState({
                componentExpanded: null
            })
        } else {
            this.setState({
                componentExpanded: index
            })
        }
    }


    componentDidMount(){
        this.props.authCheck();
    }



    render() {
        
        const menu = this.state.dashboardData.map((item, index) => {
            return (
                <DashboardMenu 
                isExpanded={()=>this.isExpanded(index)} 
                expanded={this.state.componentExpanded === index} 
                item={item} 
                key={item.title} 
                />
            );
        });


        return (
            <Box
                sx={{
                    background: "#FFFFFF",
                    margin: "90px 20px 20px 20px", 
                    padding: "0px",
                    // cursor: "pointer"
                    // width: "80%",
                    // height: 300,
                    // margin: "auto",
                    // backgroundColor: 'primary.dark',
                    // borderRadius: 2,
                    // '&:hover': {
                    //     backgroundColor: 'primary.main',
                    //     opacity: [0.9, 0.8, 0.7],
                    // },
                }}
            >

                {menu}

            </Box>
        );
    }


}

export default Dashboard;