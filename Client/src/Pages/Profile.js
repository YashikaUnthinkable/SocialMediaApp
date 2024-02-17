import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../Components/PostList";
import CommentList from "../Components/CommentList";

function Profile(props) {
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const nevigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
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
      <div>
        <div className="row">
          <h2 className="col-6">{userData.username}</h2>
          <div className="col-6 align-right">
            <h2>{userData.email}</h2>
          </div>
          
        </div>
        <h4>Upload a new Post</h4>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-5">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary col-3">
            Upload
          </button>
        </form>
        <hr />
        <h4>Your Posts</h4>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 d-flex flex-column-reverse align-items-center justify-content-center">
            <PostList
              data={data}
              setData={setData}
              // userId={props.userId}
              comments={props.comments}
              setComments={props.setComments}
            />
          </div>
          <div className="col-3 border" style={{ overflowY: "auto" }}>
            <div className="d-flex flex-column-reverse">
              <CommentList
                comments={props.comments}
                setComments={props.setComments}
              />
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

export default Profile;
