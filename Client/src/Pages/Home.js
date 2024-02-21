import React, { useEffect, useState } from "react";

import PostList from "../Components/PostList";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const nevigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [count, setCount] = useState(0);
  const [previous, setPrivious] = useState(true);
  const [next, setNext] = useState(true);
  useEffect(() => {
    // for geting all posts data on initialization
    try {
      console.log("count:", count);
      if (count > postsCount) {
        setNext(false);
      } else {
        fetch("/api/posts" + "/" + count, {
          method: "GET",
        })
          .then(async (response) => {
            const res_data = await response.json();
            console.log(res_data);

            setData(res_data.Posts);
            setTotalPosts(res_data.totalPosts);
            props.setUserId(res_data.id);
            setPostsCount(res_data.PostsCount);
            if (count + 10 < res_data.PostsCount) {
              setNext(true);
              setPrivious(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [, count]);

  const setPaging = (e) => {
    console.log("Data: ",data);
    const n = e.target.name;
    if (n === "privious") {
      let newCount = count - 10;
      setCount(newCount);
      if (count == 0) {
      }
    } else {
      let newCount = count + 10;
      setCount(newCount);
      if(count>postsCount){
        setNext(false);
      }
      setPrivious(true);

      setData([]);
    }
  };
  const previousButton = (
    <button className="btn btn-primary m-2" name="privious" onClick={setPaging}>
      Privious
    </button>
  );
  const nextButton = (
    <button className="btn btn-primary m-2" name="next" onClick={setPaging}>
      Next 
    </button>
  );

  if (props.isLoggedIn) {
    console.log("Home: logged in");
    return (
      <div
        className="d-flex flex-column-reverse align-items-center justify-content-center"
        style={{ overflowY: "auto", marginTop: "70px" }}
      >
        <PostList data={data} setData={setData} userId={props.userId} />
        <div>
          <h1>total no of posts are: {totalPosts}</h1>
        </div>
        <div
          className=" d-flex flex-row position-fixed fixed-bottom bg-white "
          style={{ justifyContent: "flex-end" }}
        >
          {previous ? previousButton : ""}
          {next ? nextButton : ""}
        </div>
      </div>
    );
  } else {
    // if not login nevigate to the login page
    nevigate("/login");
  }
}
