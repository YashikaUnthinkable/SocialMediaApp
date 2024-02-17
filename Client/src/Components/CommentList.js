import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
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
