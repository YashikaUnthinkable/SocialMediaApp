import React, { useEffect, useState } from "react";

import PostList from "../Components/PostList";

export default function Home(props) {
  const [data,setData] = useState([]);


  useEffect(()=>{
    try {
      fetch("http://localhost:5000/api/posts",{
      method: "GET"
      }).then(async (response)=>{
        const res_data = await response.json();
        console.log(res_data);
        if(response.ok){
          props.setLoggedIn(true);
          props.setTotalPosts(res_data.totalPosts)
          console.log("ok");
          setData(res_data.Posts);
        }
      }
        ).catch((err)=>{console.log(err)});

      
    } catch (error) {
      console.log(error);
    }
  },[])
  
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div><h1>total no of posts are: {props.totalPosts}</h1></div>
        <PostList data={data} setData={setData}/>
      </div>
    </div>
  );
}
