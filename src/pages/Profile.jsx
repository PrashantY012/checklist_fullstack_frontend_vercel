import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
function Profile() {
  const {user,setUser,setIsAuthenticated,isAuthenticated,loading}=useContext(Context)
  // console.log("from profile: ",user);
  // if(!isAuthenticated)
  //   {
  //     return <Navigate to="/login"></Navigate>  
  //   }
  return (
    
    <div>
    {!isAuthenticated?<Navigate to="/login"></Navigate>:
      <div>
      {user?<h2>{user.name}</h2>:<h1></h1>}
      {user?<h3>{user.email}</h3>:<h1></h1>}
      </div>
    }
    </div>
  )
}

export default Profile