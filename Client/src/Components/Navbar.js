import React, { useState } from "react";
import { NavLink } from "react-router-dom";




export default function Navbar(props) {
  console.log("navbar:",props.isLoggedIn);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <NavLink className="navbar-brand d-flex flex-row" to="#">
            Social Medial App
          </NavLink>
          <div className="collapse navbar-collapse d-flew flex-row-reverse" id="navbarContent">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink className="nav-link " to="/" aria-expanded="false">
                  Home
                </NavLink> 
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link " to="/about" aria-expanded="false">
                  About
                </NavLink>
                
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link " to="/contact" aria-expanded="false">
                  Contact
                </NavLink> 
              </li>
              
              <li className="nav-item ">
                <NavLink className="nav-link " to={(props.isLoggedIn) ? "/logout" : "/register"} aria-expanded="false">
                  {props.isLoggedIn? "Logout" : "SignUp"}
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link " to={(props.isLoggedIn)? "/profile" : "/login"} aria-expanded="false">
                {props.isLoggedIn? "Profile" : "Signin"}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
