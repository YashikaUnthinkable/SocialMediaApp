import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";

export default function Post(props) {
  let [liked, setLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isComment, setIsComment] = useState(false);
  useEffect(() => {
    // Fetch image from the server
    fetch(`/api/image/${props.post.img}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((imageBlob) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
    console.log(props.post.LikedBy);
    console.log(props.userId);
    if (props.post.LikedBy.indexOf(props.userId) !== -1) {
      setLiked(true);
    } else {
      setLiked(false);
    } // true
  }, []);

  const setLike = async () => {
    if (liked) {
      setLiked(false);
      let newData = [...props.data];
      var i = newData[props.index].LikedBy.indexOf(1);
      if (i !== -1) {
        newData[props.index].LikedBy.splice(i, 1);
      }
      props.setData(newData);
      let ldata = await {
        pid: props.post.id,
        liked: false,
      };
      const response = await fetch("/api/posts/uploadNoOfLikes", {
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
      let newData = [...props.data];
      newData[props.index].LikedBy.push(1);
      props.setData(newData);
      let ldata = await {
        pid: props.post.id,
        liked: true,
      };
      const response = await fetch("/api/posts/uploadNoOfLikes", {
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

  const setComment =() => {
    if (isComment) {
      setIsComment(false);
      props.setComments([]);
    } else {
      setIsComment(true);
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
          props.setComments(res_data.Comments);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addComments = () => {
    let msg = document.getElementById("comment" + props.index).value;
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
      })
      .catch((err) => console.log(err));
      props.setComments([]);
    setComment(false);
  };

  let commentBox = (
    <div className="p-3 row">
      <div className="col-8">
        <input
          type="text"
          className=" col-6 form-control"
          id={"comment" + props.index}
        />
      </div>
      <button className=" col-4 btn btn-primary" onClick={addComments}>
        Add Comment
      </button>
    </div>
  );
  return (
    <div className="shadow-lg col h-50 w-100 bg-white m-2 rounded">
      <div className="row-2">
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
            {props.post.LikedBy.length} Likes
          </div>
          <div className="p-3 col-5 fs-5" onClick={setComment}>
            <FaRegCommentDots />
          </div>
        </div>
      </div>
      <div className="row-2">{isComment ? commentBox : ""}</div>
    </div>
  );
}
