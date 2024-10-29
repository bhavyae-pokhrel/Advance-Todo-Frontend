import React, {useEffect } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr"
import './Task.css';
import { toast } from "react-toastify";
import UpdateTask from './UpdateTask';
import axios from "axios"



let toUpdateArray=[] // it store jisko update karna ha uska title && body

function Task({collection}) { // collection ka data comes from API so it have _id,user,body,title

  const remove= async(id)=>{ // id of task
    if(id){
      console.log(id)
      await axios.delete(`https://advance-todo-backend-m28l.onrender.com/api/v1/deleteTask/${id}`)
      //await axios.delete(`http://localhost:5000/api/v1/deleteTask/${id}`,{data:{id:id}})

      .then((response)=>{
        console.log(response.data)
        toast.success(response.data.message)
      })
      .catch((error)=>{
        console.log(error.message)
      })
    }
    else{
      toast.error('Please SignUp First') 
    }

  }
   
  const display=(value)=>{  
    console.log(value)  
    document.getElementById("todo-update").style.display=value;
    //& starting me UpdateTask display:block(non visible) but this will make UpdateTask display:none(visible)
  }

  const toBeUpdate=(index)=>{        // fill in the array jisko update karna ha
    console.log(collection[index])
    toUpdateArray=collection[index]     // collection ka data comes from API so it have _id,user,body,title
    console.log(toUpdateArray.title) // there are multiple task, collection[index] is ichanging task    
  }

  return ( 
    <>
       <div className='todo-body'>
        <div className='container-fluid'>
          <div className='row'>
          {collection.map((task,index)=>(   
            <div className="col-lg-3 mx-5 my-2" key={index}>
              <div className="p-3 todo-card">

                <div>
                  <h3 >{task.title}</h3> {/* not accept after 50 words */}
                   <p className='todo-card-p' style={{color:'GrayText'}} >{task.body.split("",50)}..</p> 
                </div>

                <div className='d-flex justify-content-around'>
                  <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1'
                      onClick={()=>{display("block");toBeUpdate(index)}}>  
                    <GrDocumentUpdate className='card-icons'/>Update    
                  </div>

                  {/* //!    IMPORTANT CONCEPT */}
                  {/* //& fetch task._id to remove it from collection array */}

                  <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1'
                    onClick={()=>remove(task._id)}>
                    <AiFillDelete className='card-icons del'/>Delete
                  </div>

                </div>
              </div>
              <div className='todo-update' id='todo-update'>
                <div className='container update'>
                  <UpdateTask display={display} toUpdateArray={toUpdateArray}/>
                </div>
              </div>
            </div>   
           
          ))}

        </div>
      </div>
    </div>
     {/* <div className='todo-update' id='todo-update'>
        <div className='container update'>
          <UpdateTask display={display} />
        </div>
      </div> */}

    </>
   
    
  )
}

export default Task
