import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
    // let comments = [
    //     {commentedBy: "abc",
    //     message: "Hello1"},
    //     {commentedBy: "abc",
    //     message: "Hello2"},
    //     {commentedBy: "abc",
    //     message: "Hello3"},
    //     {commentedBy: "abc",
    //     message: "Hello4"},
    //     {commentedBy: "abc",
    //     message: "Hello5"},
    //     {commentedBy: "abc",
    //     message: "Hello6"},
    //     {commentedBy: "abc",
    //     message: "Hello7"},
    //     {commentedBy: "abc",
    //     message: "Hello7"},
    //     {commentedBy: "abc",
    //     message: "Hello7"},
    //     {commentedBy: "abc",
    //     message: "Hello7"},
    //     {commentedBy: "abc",
    //     message: "Hello7"},
    //     {commentedBy: "abc",
    //     message: "Hello7"},
    // ]
  return props.comments.map((comment, i) => {
    return (
      <Comment
        comment={comment}
        index= {i}
        setComment = {props.setComment}
      />
    );
  })
}
