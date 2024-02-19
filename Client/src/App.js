import React,{useState, useEffect} from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import Logout from "./Pages/Logout";
import { BrowserRouter, Route , Routes} from "react-router-dom";//for routing the different pages on different paths

function App(){
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
 
  const handleUserExist = ()=>{
    try{
      let ans;
      fetch("/api/userExist",{
        method: "GET",
        headers: {
          "Content-Type":"application/json"
        }
      }).then(async(response)=>{
          console.log(response.ok?"ok":"not ok");
          if(response.ok){
            setLoggedIn(true);
          }
          else{
            setLoggedIn(false);
          }
      }).catch((err)=>{
        console.log(err);
      });
      return ans;
    }
    catch(err){
      console.log(err);
    }
  }
  handleUserExist();
  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home
          isLoggedIn={isLoggedIn} 
          userId={userId}
          setUserId={setUserId}/>}/>

          <Route path="/about" element={<About/>}/>

          <Route path="/contact" element={<Contact/>}/>

          <Route path="/register" element={<Register 
          handleUserExist={handleUserExist}
          isLoggedIn={isLoggedIn} />}/>

          <Route path="/login" element={<Login 
          setLoggedIn={setLoggedIn}
          isLoggedIn={isLoggedIn}
           handleUserExist={handleUserExist}/>}/>

          <Route path="/profile" element={<Profile
          isLoggedIn={isLoggedIn}
/>}/>

          <Route path="/logout" element={<Logout 
          isLoggedIn={isLoggedIn}
          handleUserExist={handleUserExist}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
