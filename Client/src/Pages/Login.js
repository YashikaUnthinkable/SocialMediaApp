import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    
    const nevigate = useNavigate();

    const handleInput = (e)=>{
        let newUser = {...user};
        let name = e.target.name;
        let value = e.target.value;
        newUser[name] = value;
        setUser(newUser);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(user)
            }    
            )
            if(response.ok){
                setUser({
                    email: "",
                    password: ""
                });
                alert("Login successful")
                nevigate("/")
            }
            else{
                alert("Invalid Credentials...")
            }
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div>
      <div className="container">
        <div className="row m-5 center">
          <img
            src="/images/login.png"
            className="h-100 w-50"
            alt="not available"
          />
          <div className="col-sm text-left m-5 border">
            <h2 className="text-primary">Login Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-4">
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
