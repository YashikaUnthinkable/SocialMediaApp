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
  const [totalPosts,setTotalPosts] = useState(0);

  const HandletotalPosts = (input)=>{
    setTotalPosts(input);
  }
  const [data,setData] = useState([]);

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
  useEffect(()=>{
    try {
      
      fetch("/api/posts",{
      method: "GET"
      }).then(async (response)=>{
        const res_data = await response.json();
        console.log(res_data);
        setData(res_data.Posts);
        HandletotalPosts(res_data.totalPosts);
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
          <Route path="/" element={<Home
          isLoggedIn={isLoggedIn} 
          setTotalPosts={HandletotalPosts} 
          totalPosts={totalPosts} 
          data={data}
          handleUserExist={handleUserExist}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register 
          handleUserExist={handleUserExist}
          isLoggedIn={isLoggedIn} />}/>
          <Route path="/login" element={<Login 
          setLoggedIn={setLoggedIn}
          isLoggedIn={isLoggedIn}
           handleUserExist={handleUserExist}/>}/>
          <Route path="/profile" element={<Profile totalPosts={totalPosts} setTotalPosts={HandletotalPosts}/>}/>
          <Route path="/logout" element={<Logout 
          isLoggedIn={isLoggedIn}
          handleUserExist={handleUserExist}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
