import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {//
  const nevigate = useNavigate();
  fetch("/api/logout",{
    method: "POST",
    headers:{
        "Content-Type": "application/json" 
    }
  }).then((response)=>{
    if(response.ok){
        props.handleUserExist();
        if(props.isLoggedIn){
            console.log("Not successful")
        }
        else{
            nevigate("/login");
        }
    }
  })
  
  return <div></div>;
}
