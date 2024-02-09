import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                <NavLink className="nav-link " to="/register" aria-expanded="false">
                  SignUp
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link " to="/login" aria-expanded="false">
                  SignIn
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
