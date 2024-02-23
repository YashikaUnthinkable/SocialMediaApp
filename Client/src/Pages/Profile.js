import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../Components/PostList";
import CommentList from "../Components/CommentList";

function Profile(props) {
  const [file, setFile] = useState(null);
  const [title, settitle] = useState("");
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const nevigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleTitleChange = (e)=>{
    settitle(e.target.value);
  }
  useEffect(() => {
    console.log("Profile page");
    fetch("/api/userData", {
      method: "GET",
    })
      .then(async (response) => {
        const res_data = await response.json();
        console.log(res_data);
        console.log(res_data.user);
        console.log(res_data.data);
        setData(res_data.data);
        setUserData(res_data.user);
        props.setComments([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      const response = await fetch("/api/posts/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("File uploaded:", data.filename);
      nevigate("/");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  if (props.isLoggedIn) {
    return (
      <div  style={{marginTop: "70px"}}>
        <div className="row">
          <h2 className="col-6">{userData.username}</h2>
          <div className="col-6 align-right">
            <h2>{userData.email}</h2>
          </div>
          
        </div>
        <h4>Upload a new Post</h4>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-1">
            <label htmlFor="image"
            className="float-right">Image: </label>
          </div>
          <div className="col-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              id = "image"
              required="true"
            />
          </div>
          <div className="col-1"></div>
          <div className="col-1">
          <label htmlFor="title">Title: </label>
          </div>
          <div className="col-3">
            <input type="text" 
            className="form-control"
            onChange= {handleTitleChange} 
            required="true"
            id="title"/>
          </div>

          <button type="submit" className="btn btn-primary col-2">
            Upload
          </button>
        </form>
        <hr />
        <h4>Your Posts</h4>
          <div className="d-flex flex-column-reverse align-items-center justify-content-center"
            style={{ overflowY: "auto" }}>
            <PostList
              data={data}
              setData={setData}
              // userId={props.userId}
              comments={props.comments}
              setComments={props.setComments}
            />
          </div>
      </div>
    );
  } else {
    nevigate("/login");
  }
}

export default Profile;
