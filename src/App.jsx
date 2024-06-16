import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import {Context, server} from "./main.jsx"
function App() {
  const {user,setUser,setIsAuthenticated,isAuthenticated}=useContext(Context);
  useEffect(() => {
    axios.get(`${server}/api/v1/users/me`,{
      withCredentials:true,
    }).then(
      (res)=>{
        if(res.data.message.name)
          {
            setIsAuthenticated(()=>true)
            setUser(()=>res.data.message);
            // console.log("user is from app: ",user);
            // console.log("user is from app: ",res.data.message);
          }
        // alert(isAuthenticated)
        else
        {
        setUser({})
        setIsAuthenticated(()=>false)
        }
        // console.log(res);
      } 
    ).catch(
      (error)=>{
        setUser({})
        setIsAuthenticated(()=>false)

      }
    )
  }, [])
  


  return (
    <Router>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
