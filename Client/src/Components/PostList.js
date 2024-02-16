import React, { useState } from "react";
import Post from "./Post";

export default function PostList(props) {
  // const [postsLiked, setPostsLiked] = useState([]);
  // fetch("/api/auth/postsLiked", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then(async (response) => {
  //     let res_data = await response.json();
  //     if (response.ok) {
  //       console.log("postList: ",res_data);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return props.data.length > 0 ? (
    props.data.map((post, i) => {
      return (
        <Post
          post={post}
          key={i}
          index={i}
          data={props.data}
          setData={props.setData}
          userId= {props.userId}
          setComments= {props.setComments}
          comments = {props.comments}
        />
      );
    })
  ) : (
    <h1>No Post is available...</h1>
  );
}
