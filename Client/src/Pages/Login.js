import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
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

    //handle the submit 
    const handleSubmit = async (e)=>{
        e.preventDefault();//to stop by default reloading
        console.log(user);
        try {
          // for sending the login request
            const response = await fetch("/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(user)
            }    
            )
            if(response.ok){
               var res_data = await response.json();
                setUser({
                    email: "",
                    password: ""
                });
                
            }
            else{
                alert("Invalid Credentials...")
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    props.handleUserExist();
    console.log("log in : ",props.isLoggedIn)
    if(props.isLoggedIn){
      nevigate("/")
    }
    else{
      return (
        <div style={{marginTop: "70px"}}>
          <div className="container">
            <div className="row m-5 center p-0 shadow-lg rounded">
              <img
                src="/images/login.png"
                className="h-50 w-50"
                alt="not available"
              />
              <div className="col-sm text-left m-5 ">
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
  }
