import React from 'react';

class MyJobs extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.authCheck();
    }
    render(){
        return (
            <div>
                <div style={{marginTop:"70px", textAlign:"center"}}>
                    <h1>This page is not designed yet!</h1>
                </div>
            </div>
        )
    }
}

export default MyJobs;
