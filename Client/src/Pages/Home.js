import React, { useEffect, useState, useRef } from "react";
import PostList from "../Components/PostList";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { FaSearch, FaUmbrella } from "react-icons/fa";

export default function Home(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [title, settitle] = useState("");
  const [postsCount, setPostsCount] = useState(0);
  const [count, setCount] = useState(0);
  const [fetchingData, setFetchingData] = useState(false); // Track if data is being fetched
  const containerRef = useRef(null);

  useEffect(() => {
    props.setisProfile(false);
    fetchPosts();
  }, [count]);

  const fetchPosts = () => {
    console.log("title: "+ title);
    try {
      if (count > postsCount) {
        return; // No more posts to fetch
      } else {
        console.log(count);
        var url = "";
        if(title!=""){
          console.log("title for specific posts: "+ title);
          url = "/api/posts" + "/" + count +"/" + title
        }
        else{
          console.log("title for all posts: "+ title);
          url = "/api/posts" + "/" + count
        }
        fetch(url)
          .then(async (response) => {
            const res_data = await response.json();
            console.log(count)
            if(count===0){
              setData([...res_data.Posts]);
            }
            else{
              setData((prevData) => [...prevData, ...res_data.Posts]);
            }
            
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
  const handleInput = (e)=>{
    settitle(e.target.value);
  }
  const handleSubmit = ()=>{
    setCount(0);
    fetchPosts();
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (props.isLoggedIn) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ overflowY: "auto", marginTop: "80px" }}
        ref={containerRef}
      >
        <div className="row pt-2" >
          <div className="col-8 ">
            <input type="text" className="form-control" onChange={handleInput} value={title} placeholder="Enter your title"/>
          </div>
          <div className="col-1" onClick={handleSubmit}>
            <FaSearch/>
          </div>
        </div>
        <PostList data={data} setData={setData} userId={props.userId} />
        
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
}
