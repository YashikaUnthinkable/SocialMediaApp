import React, { useEffect, useState, useRef } from "react";
import PostList from "../Components/PostList";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

export default function Home(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [count, setCount] = useState(0);
  const [fetchingData, setFetchingData] = useState(false); // Track if data is being fetched
  const containerRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [count]);

  const fetchPosts = () => {
    try {
      if (count > postsCount) {
        return; // No more posts to fetch
      } else {
        console.log(count);
        fetch("/api/posts" + "/" + count)
          .then(async (response) => {
            const res_data = await response.json();
            setData((prevData) => [...prevData, ...res_data.Posts]);
            console.log("Data: ", res_data.Posts);
            setTotalPosts(res_data.totalPosts);
            props.setUserId(res_data.id);
            setPostsCount(res_data.PostsCount);
            console.log("called");
            setFetchingData(false); // Reset flag when data fetching is complete
          })
          .catch((err) => {
            console.log(err);
            setFetchingData(false); // Reset flag on error as well
          });
      }
    } catch (error) {
      console.log(error);
      setFetchingData(false); // Reset flag on error as well
    }
  };

  const handleScroll = debounce(() => {
    const container = containerRef.current;
    if (container && !fetchingData) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      if (distanceToBottom <= 100) {
        console.log('fetching more data');
        setFetchingData(true); // Set flag to indicate data fetching is in progress
        setCount((prevCount) => prevCount + 10);
      }
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (props.isLoggedIn) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ overflowY: "auto", marginTop: "70px" }}
        ref={containerRef}
      >
        <div>
          <h1>Total number of posts: {postsCount}</h1>
        </div>
        <PostList data={data} setData={setData} userId={props.userId} />
        
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
}
