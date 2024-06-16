import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../styles/app.scss"
export const server="https://backendtodosixpprog.onrender.com"
import { createContext } from 'react'
export const Context=createContext({isAuthenticated:false})
const AppWrapper=()=>{
  let [isAuthenticated,setIsAuthenticated]=useState(false);
  let [loading,setLoading]=useState(false);
  let [user,setUser]=useState({});
  return (
  <Context.Provider value={{isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}}>
    <App />
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper></AppWrapper>
  </React.StrictMode>,
)
