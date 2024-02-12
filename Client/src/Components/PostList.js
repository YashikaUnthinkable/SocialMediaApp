import React from 'react';
import Post from './Post';

export default function PostList(props) {
  return ( 
    props.data.length>0 ?  
      props.data.map((post,i)=>{
          return (<Post post={post}
           key={i} 
           index={i} data={props.data} setData = {props.setData}/>)
      })
      : <h1>No Post is available...</h1>
  )
}
