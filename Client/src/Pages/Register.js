import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const nevigate = useNavigate();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let newUser = { ...user };
    newUser[name] = value;
    setUser(newUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        setUser({
          username: "",
          email: "",
          password: "",
        });
        nevigate("/login")
      } else {
        const res_data = await response.json();
        alert(res_data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (props.isLoggedIn) {
    nevigate("/");
  } else {
    return (
      <div className="container " style={{ marginTop: "70px" }}>
        <div className="row m-5 center rounded shadow-lg">
          <img
            src="/images/registration.png"
            className="h-100 w-50"
            alt="not available"
          />
          <div className="col-sm text-left m-4 p-3">
            <h2 className="text-primary">Registration Form</h2>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
