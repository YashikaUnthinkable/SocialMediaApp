import React from 'react'

export default function Comment(props) {
  return (
    <div>
        By: {props.comment.commentedBy}
        <br />
        {props.comment.message}
        <hr />
    </div>
  )
}
