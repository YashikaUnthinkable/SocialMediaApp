import React, { useEffect, useState } from "react";

import PostList from "../Components/PostList";
import CommentList from "../Components/CommentList";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const nevigate = useNavigate();
  useEffect(() => {
    try {
      fetch("/api/posts", {
        method: "GET",
      })
        .then(async (response) => {
          const res_data = await response.json();
          console.log(res_data);
          props.setData(res_data.Posts);
          props.setTotalPosts(res_data.totalPosts);
          props.setUserId(res_data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  props.handleUserExist();

  if (props.isLoggedIn) {
    console.log("Home: logged in");

    return (
      <div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 d-flex flex-column-reverse align-items-center justify-content-center">
            <PostList
              data={props.data}
              setData={props.setData}
              userId={props.userId}
              comments = {props.comments}
              setComments = {props.setComments}
            />
            <div>
              <h1>total no of posts are: {props.totalPosts}</h1>
            </div>
          </div>
          <div className="col-3 border" style={{overflowY: "auto"}}>
            <div className="d-flex flex-column-reverse">
            <CommentList 
            comments={props.comments}
            setComments={props.setComments}/>
            <h3>Comments</h3>
            </div>
            
          </div>
        </div>
      </div>
    );
  } else {
    nevigate("/login");
  }
}
