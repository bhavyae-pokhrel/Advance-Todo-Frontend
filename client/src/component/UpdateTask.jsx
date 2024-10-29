import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

function UpdateTask({display,toUpdateArray}) {

   useEffect(()=>{
    SetchangeValue({title:toUpdateArray.title,body:toUpdateArray.body})
     
   },[toUpdateArray])

  
  const[changeValue,SetchangeValue]=useState({title:"",body:""})

  const handleChange=(event)=>{
    const {name,value}=event.target
    SetchangeValue({...changeValue,[name]:value})
  }

  const submit=async()=>{
    console.log(changeValue)
    await axios.put(`https://advance-todo-backend-m28l.onrender.com/api/v1/updateTask/${toUpdateArray._id}`,changeValue)
     .then((response)=>{
      console.log(response)
      toast.success(response.data.message)
      
     })
    display("none")

  }

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input type="text" className='todo-input my-4 w-100 p-3' value={changeValue.title} onChange={handleChange} name='title'/>
      <textarea className='todo-input w-100 h-20 p-3' value={changeValue.body} onChange={handleChange} name='body'/>
      <div>
        <button className='btn btn-dark my-4'  onClick={submit}>UPDATED</button>
        <button className='btn btn-danger my-4 mx-3' onClick={()=>display("none")}>CLOSE</button>
      </div>
    </div>
  )
}

export default UpdateTask
