import React, { useState, useEffect } from "react";

export default function Comment(props) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Run the date formatting function when the component mounts
    setFormattedDate(setDateData(props.comment.createdAt));
  }, []); // Empty dependency array ensures this effect runs only once

  const setDateData = (pdate) => {
    console.log(pdate);
    const mdate = Date.parse(pdate);
    const milliseconds = Date.now() - mdate;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Construct a formatted string
    let formattedString = '';
    if (days > 0) {
      formattedString += days + 'd ';
    } else if (hours > 0) {
      formattedString += hours + 'h ';
    } else if (minutes > 0) {
      formattedString += minutes + 'm ';
    } else if (seconds > 0) {
      formattedString += seconds + 's ';
    } else {
      formattedString = "now";
    }

    return formattedString;
  };

  return (
    <div className="col">
      <div className="row-6 row">
        <div className="col-10 ">By: {props.comment.commentedBy}</div>
        <div className="col-2">{formattedDate}</div>
      </div>
      <div className="row-6">{props.comment.message}</div>
      <hr />
    </div>
  );
}
