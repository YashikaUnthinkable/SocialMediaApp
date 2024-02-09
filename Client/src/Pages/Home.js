import React, { useEffect, useState } from "react";

import PostList from "../Components/PostList";

export default function Home() {
  const [data,setData] = useState([]);


  useEffect(()=>{
    try {
      fetch("http://localhost:5000/api/posts",{
      method: "GET"
      }).then(async (response)=>{
        const res_data = await response.json();
        if(response.ok){
          console.log("ok");
          setData(res_data)
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
        <PostList data={data} />
      </div>
    </div>
  );
}
