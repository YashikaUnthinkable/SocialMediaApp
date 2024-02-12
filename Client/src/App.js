import React,{useState} from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route , Routes} from "react-router-dom";//for routing the different pages on different paths

function App(){
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [totalPosts,setTotalPosts] = useState(0)
  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home setLoggedIn={setLoggedIn} setTotalPosts={setTotalPosts} totalPosts={totalPosts}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
