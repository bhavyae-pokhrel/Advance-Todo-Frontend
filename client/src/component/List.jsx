import React, { useState,useEffect } from 'react'
import Task from "./Task"
import { toast } from "react-toastify";
import axios from "axios"

import {useForm} from "react-hook-form"

function List(){
   const [collection,setCollection]=useState([])
   let id=sessionStorage.getItem("id") 

   const {
      register,
      handleSubmit,
      watch,
      formState:{errors},
   }=useForm({mode: "onSubmit"});

    //^ mode: "onSubmit" means on submit the data then error show otherwise error always show
     

      const AddTask=async(data)=>{
         let title=data.title
         let body=data.body
         console.log(data)
        
            if(id){
              await axios.post("https://advance-todo-backend-m28l.onrender.com/api/v1/addTask",{id:id,title:title,body:body})
              .then((response)=>{
                  console.log(response.data.message) 
                  toast.success(response.data.message)  
              })
              .catch((errors)=>{
                 console.log(errors.message)
              })
              let newCollection=[...collection,{title,body}];
              setCollection(newCollection);
              console.log(collection);
            }
                
      }
  
      useEffect(()=>{
         if(id){
            const fetch=async()=>{
               await axios.get(`http://localhost:5000/api/v1/getTask/${id}`)
               .then((response)=>{
                 //console.log(response)
                 setCollection(response.data.list)
                 
               })
               .catch((errors)=>{
                 console.log(errors)
                 })
            }
            fetch()
         }
     

      },[AddTask])

  return (
    <div className='todo'>

        {/* //^ CUSTOM ERRORs SHOW */}
         <form onSubmit={handleSubmit(AddTask)}>
          <input type='text' placeholder='Enter the title here...' {...register('title', 
            {
               required:true,
               minLength:{value:3,message:'Minimum Length of title should be 3'},
               maxLength:{value:50,message:"Maximum Length of title should be  50"}
            })} />
           

            {errors.title && <span style={{ color: 'red',marginLeft:"20px" }}> {errors.title.message}</span>}


            <input type='text' placeholder='Enter the body here...' style={{marginLeft:"50px"}} {...register('body',
              {
               required:true,
               minLength:{value:3,message:'Minimum Length of body should be 3'},
               maxLength:{value:50,message:"Maximum Length of body should be 50"}
            })}/>
            
            {errors.body && <span style={{ color: 'red',marginLeft:"20px" }}> {errors.body.message}</span>}

          <button type='submit' style={{marginLeft:"50px"}}>Add To Task</button>
         </form> 
       
        <br/>
        <Task collection={collection}/>

    </div>
  )
}

export default List