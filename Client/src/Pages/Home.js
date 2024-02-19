import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import PostList from "../Components/PostList";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const nevigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  useEffect(() => {
    // for geting all posts data on initialization
    try {
      fetch("/api/posts", {
        method: "GET",
      })
        .then(async (response) => {
          const res_data = await response.json();
          console.log(res_data);
          setData(res_data.Posts);
          setTotalPosts(res_data.totalPosts);
          props.setUserId(res_data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (props.isLoggedIn) {
    console.log("Home: logged in");
    return (
      <div
        className="d-flex flex-column-reverse align-items-center justify-content-center"
        style={{ overflowY: "auto" , marginTop: "70px"}}
      >
        <PostList data={data} setData={setData} userId={props.userId} />
        <div>
          <h1>total no of posts are: {totalPosts}</h1>
        </div>
      </div>
    );
  } else {
    // if not login nevigate to the login page
    nevigate("/login");
  }
}
