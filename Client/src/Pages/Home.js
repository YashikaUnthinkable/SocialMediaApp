import React, { useEffect, useState } from "react";

import PostList from "../Components/PostList";
import { useNavigate } from "react-router-dom";



export default function Home(props) {
  const nevigate = useNavigate();
  useEffect(()=>{
    console.log(props.isLoggedIn);
    if(props.isLoggedIn===false){
      nevigate("/login");
    }
    else{
      
    }
  })
  
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div><h1>total no of posts are: {props.totalPosts}</h1></div>
        <PostList data={props.data}/>
      </div>
    </div>
  );
}
