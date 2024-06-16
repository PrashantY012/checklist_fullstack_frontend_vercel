import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(()=>true);
    // console.log(name, email, password);
    try {
        const responeData = await axios.post(
        `${server}/api/v1/users/login`,
        {
          "email":email,
          "password":password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(responeData.data.message);
      setIsAuthenticated(()=>true);
      // console.log(responeData);
      setLoading(()=>false);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(`${server}/users/new`);
      // console.log("error is: ",error.response.data.message)
      setIsAuthenticated(()=>false);
      setLoading(()=>false);
    }
    
  };
  if(isAuthenticated)return <Navigate to="/"></Navigate>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button type="Login" disabled={loading}>Login</button>
          <h4>Or</h4>
          <Link to="/register">Signup</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
