import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function Post(props) {
  let [liked, setLiked] = useState(false);

  const setLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };

  return (
    <div className="shadow-lg col h-50 w-50 bg-white m-2 rounded">
      <div className="row-2">
        <div className="p-3">
            Posted By- {props.post.postedBy}
        </div>
      </div>
      <img
        src={`/images/${props.post.img}.jpg`}
        className="row-8 img-fluid p-1 rounded"
        alt="not available"
      />
      <div className="row-2 ">
        <div className="p-3">
          <div
            className="text-danger fs-4 "
            onClick={setLike}>
            {liked ? <FaHeart /> : <FaRegHeart />}
          </div>
          {props.post.noOfLikes} Likes
        </div>

        
      </div>
    </div>
  );
}
