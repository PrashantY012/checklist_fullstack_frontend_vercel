import React, { useContext, useState ,useEffect} from 'react'
import { Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import {server} from "../main"
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';
function Home() {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [loading,setLoading]=useState(false);
  const [tasks,setTasks]=useState([]);
  const [refresh,setRefresh]=useState(false);
  const {isAuthenticated}=useContext(Context);

  const updateHandler=async (id)=>{
    // toast.success(id)
   try {
    const {data}=await axios.put(`${server}/api/v1/tasks/${id}`,{},{
      withCredentials:true,
    })
    // console.log(data);
    toast.success(data.message);
    setRefresh(prev=>!prev)
   } catch (error) {
      toast.error(error.response.data.message)
   }
  }
  const deleteHandler=async (id)=>{

    // toast.error(id)
   try {
    const {data}=await axios.delete(`${server}/api/v1/tasks/${id}`,{
      withCredentials:true,
    })
    // console.log(data);
    toast.success(data.message);
    setRefresh(prev=>!prev)
   } catch (error) {
      toast.error(error.response.data.message)
   }
  }

  useEffect(() => {
    
    
      const data=axios.get(`${server}/api/v1/tasks/my`,{
        withCredentials:true,
      }).then((res)=>{
        setTasks(()=>res.data.tasks)
      }).catch((err)=>{
        toast.error(err.response.data.message)
      })
   
  }, [refresh]) 
  



  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data}=await axios.post(`${server}/api/v1/tasks/new`,
        {
          title:title,
          description:description,
        },
        {
        withCredentials:true
        }
      )     
      // toast.success(data.message);
      console.log(data);
      if(data.status)
        {
        toast.success(data.message);
        }
        else
        {
          toast.error(data.message);
        }
        setLoading(false);
        setDescription(()=>"");
        setTitle(()=>"");
    setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error)
      // toast.error(error.response.data.message)
      // console.log(error);
      setLoading(false);
    }
  }
  if(!isAuthenticated)
    {
      return <Navigate to="/login"></Navigate>
    }
  return (
    <div className="container">

<div className="login">
<section>
  <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => 
              setTitle(e.target.value)
            }
            required
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => 
            setDescription(e.target.value)
            }
            required
          />
          <button type="submit" disabled={loading} >Add Task</button>
        </form>
        </section>
        </div>
    <section className='todosContainer'>
      {tasks?.map((x)=>{
        return <TodoItem title={x.title} key={x._id} id={x._id} description={x.description} isCompleted={x.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} ></TodoItem>
      })}            
    </section>


    </div>
  )
}

export default Home