import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useForm } from 'react-hook-form';


function Login() {

  const dispatch= useDispatch()
  const [hidepassword,setHidePassword]=useState(true)
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState:{errors},
  }=useForm({mode: "onSubmit"});


  const findUser=async(data)=>{
    console.log('data-->',data)

    await axios.post("http://localhost:5000/api/v1/login",data) 

    .then((response)=>{
      console.log(response) //* Using this, Check where id present in API                       
      console.log(response.data.data._id);  
      sessionStorage.setItem("id",response.data.data._id)
      dispatch(authAction.login())
      navigate("/dashboard")
      toast.success(response.data.message)
    })
    .catch((error)=>{
      console.log('Login Error',error.message)
    })
   
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(findUser)} className="form">
        <label htmlFor="email">Email: </label>

        <input id="email"
         type="email"
          {...register('email',{
            required:true,
          })}
        />
        {errors.email && <span style={{ color: 'red',marginLeft:"20px" }}>Please enter the email</span>}
        

        <label htmlFor="password" style={{marginLeft:"20px"}} >Password:  </label>
        
        <input id="password" type={hidepassword?"password":"text"} 
          {...register('password',{
          required:true,
          minLength:{val:6,message:'Please enter 6 digit passsword'},
          })} 
        />
        <span onClick={()=>setHidePassword((prev)=>!prev)}>{hidepassword?<FaEye/>:<FaEyeSlash/>}</span>
        {errors.password && <span style={{ color: 'red',marginLeft:"20px" }}>{errors.password.message}</span>}
        

        <button type="submit">Login</button>
        <button className="newUserButton" onClick={() => navigate("/signup")}>
          New User
        </button>
      </form>
    </div>
  );
}


export default Login
