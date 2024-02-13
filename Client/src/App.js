import React,{useState, useEffect} from "react";
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
  const [totalPosts,setTotalPosts] = useState(0);

  const HandletotalPosts = (input)=>{
    setTotalPosts(input);
  }
  const [data,setData] = useState([]);


  useEffect(()=>{
    try {
      fetch("/api/userExist",{
        method: "GET",
        headers: {
          "Content-Type":"application/json"
        }
      }).then(async(response)=>{
          let res_data = await response.json();
          console.log(res_data);
      }).catch((err)=>{
        console.log(err);
      });
      
      fetch("/api/posts",{
      method: "GET"
      }).then(async (response)=>{
        const res_data = await response.json();
        console.log(res_data);
        if(response.ok){
          setLoggedIn(true);
          setTotalPosts(res_data.totalPosts)
          console.log("ok");
          setData(res_data.Posts);
        }
      }
        ).catch((err)=>{console.log(err)});

      
    } catch (error) {
      console.log(error);
    }
  },[])
  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} setTotalPosts={HandletotalPosts} totalPosts={totalPosts} data={data}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile totalPosts={totalPosts} setTotalPosts={HandletotalPosts}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
