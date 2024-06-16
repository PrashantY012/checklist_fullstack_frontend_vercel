import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
function Header() {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  // setIsAuthenticated(()=>true)
  const logoutHandler = async (e) => {
    // e.preventDefault();
    // console.log(name, email, password);
    setLoading(()=>true);
    
    try {
       const data= await axios.get(
        `${server}/api/v1/users/logout`,
        {
         withCredentials:true,  
        }
      );
      toast.success("logged out successfully");
      setIsAuthenticated(()=>false);
      // console.log(data);
      setLoading(()=>false);
    } catch (error) {
      toast.error(error);
      // console.log(`${server}/users/new`);
      console.log("error is: ",error)
      setIsAuthenticated(()=>true);
      setLoading(()=>false);
    }
    
  };
  
  return (
    <nav className='header'>
        <div>
            <h2>Check List</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {isAuthenticated?<button disabled={loading} className='btn' onClick={logoutHandler}>Logout</button>:<Link to={"/login"}>Login</Link>}
        </article>
    </nav>
  )
}

export default Header