import React, { useEffect, useState } from "react";

import PostList from "../Components/PostList";
import { useNavigate } from "react-router-dom";



export default function Home(props) {
  const nevigate = useNavigate();
  props.handleUserExist();
  if(props.isLoggedIn){
    console.log("Home: logged in");
    return (
      <div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div><h1>total no of posts are: {props.totalPosts}</h1></div>
          <PostList data={props.data}/>
        </div>
      </div>
    );
  }
  else{
    nevigate("/login");
  }
}
