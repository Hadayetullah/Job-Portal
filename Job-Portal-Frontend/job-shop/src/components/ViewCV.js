import React, {Component} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

class ViewCV extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: null,
        }
    }


    getData = () =>{

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
                        this.setState({
                            userData: res,
                        });
                    })
                    .catch(err => console.log(err));
            }
        }  
    }



    componentDidMount(){
        this.props.authCheck();
        this.getData();
    }

     

    render(){

        let userData = null;

        if(this.state.userData != null){
            let newObj = {};
            let objKeys = Object.keys(this.state.userData);
            for(let i in objKeys){
                let key = objKeys[i];
                let value = this.state.userData[key];
                if((value != '') && (value != null)){
                    if(typeof(value) === "boolean"){
                        let typeCasting = String(value);
                        newObj[key] = typeCasting;
                    } else {
                        newObj[key] = value;
                    }
                } 
            }
            userData = Object.keys(newObj).map((item, i) =>{
                return (
                    <li key={i}>{item}: {newObj[item]}</li>
                )
            })
        }



        return (
            <div style={{marginTop:"70px", }}>
                <div style={{width: "400px", margin:"0 auto"}}>
                    <h2 style={{margin:"0", padding:"0", textAlign:"center"}}>Form data have shown here</h2>
                    <hr />
                </div>
                <div style={{width: "550px", margin:"0 auto"}}>
                    <ol style={{padding:"0", margin:"0", }}>
                        {userData != null ? userData : <p></p>}
                    </ol>
                </div>
            </div>
        );
    }
}

export default ViewCV;
