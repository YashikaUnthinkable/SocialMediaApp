import React, { useState, useEffect, useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import CommentList from "./CommentList";

export default function Post(props) {
  let [liked, setLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalLikes, settotalLikes] = useState(0);

  useEffect(() => {
    // Fetch image from the server by image id
    fetch(`/api/image/${props.post.img}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((imageBlob) => {
        const imageUrl = URL.createObjectURL(imageBlob); // it is user to convert the image to the url
        setImageSrc(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
    if (props.post.LikedBy.indexOf(props.userId) !== -1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    settotalLikes(props.post.LikedBy.length);
  }, []);

  // a function to manage the likes and dislike on clicking on button
  const setLike = async () => {
    if (liked) {
      setLiked(false);
      settotalLikes(totalLikes - 1);
      let ldata = await {
        pid: props.post.id,
        liked: false,
      };
      //for removing the post likes
      const response = await fetch("/api/posts/LikesDisLikes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ldata),
      });
      if (response.ok) {
        var res_data = await response.json();
        console.log(res_data);
      }
    } else {
      setLiked(true);
      settotalLikes(totalLikes + 1);
      let ldata = await {
        pid: props.post.id,
        liked: true,
      };
      //for updating the post with who like the post
      const response = await fetch("/api/posts/LikesDisLikes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ldata),
      });
      if (response.ok) {
        var res_data = await response.json();
        console.log(res_data);
      }
    }
  };

  const getComment = () => {
    fetch(`/api/comments/${props.post.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response;
      })
      .then(async (response) => {
        const res_data = await response.json();
        console.log(res_data.Comments);
        setComments(res_data.Comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // a funciton to see the comments on the posts on clicking it
  const setCommentBox = () => {
    if (isComment) {
      setIsComment(false);
    } else {
      setIsComment(true);
      getComment();
    }
  };

  //a function to add comments on the posts on clicking on addcomment button
  const addComments = () => {
    let msg = document.getElementById("comment" + props.index).value; //used to get the message of that user want to add
    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: msg,
        pid: props.post.id,
      }),
    })
      .then((data) => {
        return data.json(); // Add return here
      })
      .then((res_data) => {
        console.log(res_data);
        getComment();
        document.getElementById("comment" + props.index).value = "";
      })
      .catch((err) => console.log(err));
  };

  // a template of comment Box on clicking on comment button
  let commentBox = (
    <div className="p-2 m-2 col bg-white">
      <div className="p-2 row-2 h-25 row border rounded">
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id={"comment" + props.index}
          />
        </div>
        <button className="col-4 btn btn-primary" onClick={addComments}>
          Add Comment
        </button>
      </div>
      <div className="row-10" style={{ maxHeight: "300px", overflowY: "auto" }}>
        <div className="d-flex flex-column-reverse">
          <CommentList comments={comments} setComments={setComments} />
        </div>
      </div>
    </div>
  );
  return (
    <div className="align-items-center justify-content-center w-50">
      <div
        className="shadow-lg col m-4  bg-white rounded"
        style={{ height: "580px" }}
      >
        <div className="row-3">
          <div className="p-3">Posted By- {props.post.postedBy}</div>
        </div>
        <img
          src={imageSrc}
          className="row-6 img-fluid p-1 rounded"
          alt="not available"
          id={props.post.img}
        />
        <div className="row-2 ">
          <div className="row">
            <div className="p-3 col-5">
              <div className="text-danger fs-4" onClick={setLike}>
                {liked ? <FaHeart /> : <FaRegHeart />}
              </div>
              {totalLikes} Likes
            </div>
            <div className="p-3 col-5 fs-5" onClick={setCommentBox}>
              <FaRegCommentDots />
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 bg-white rounded shadow-lg">
        {isComment ? commentBox : ""}
      </div>
    </div>
  );
}
