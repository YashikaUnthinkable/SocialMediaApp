import React, { useState } from "react";

export default function Contact() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let newUser = { ...user };
    newUser[name] = value;
    setUser(newUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setUser({
          username: "",
          email: "",
          message: "",
        });
        alert("your contact is send successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container ">
      <div className="row m-5 center rounded shadow-lg">
        <img
          src="/images/contact.png"
          className="h-100 w-50 mt-5"
          alt="not available"
        />
        <div className="col-sm text-left m-2">
          <h2 className="text-primary">Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter name"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Message</label>
              <textarea
                name="message"
                className="form-control"
                id="message"
                cols="10"
                rows="5"
                required
                autoComplete="off"
                value={user.message}
                onChange={handleInput}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
