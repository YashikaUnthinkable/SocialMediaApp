import React from "react";

import PostList from "../Components/PostList";

const data=[
    {
      id: "P1",
      img: "I001",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P2",
      img: "I002",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P3",
      img: "I003",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P4",
      img: "I004",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P5",
      img: "I005",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P6",
      img: "I006",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P7",
      img: "I007",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P8",
      img: "I008",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P9",
      img: "I009",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P10",
      img: "I010",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P11",
      img: "I011",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P12",
      img: "I012",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P13",
      img: "I013",
      noOfLikes: 0,
      postedBy: ""
    },
    {
      id: "P14",
      img: "I014",
      noOfLikes: 0,
      postedBy: ""
    }
  ]
export default function Home() {
    
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <PostList data={data} />
      </div>
    </div>
  );
}
