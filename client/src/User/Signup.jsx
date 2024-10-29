import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import './SignUp.css';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios"
import { useDispatch } from "react-redux";
import { authAction } from "../store";
import { useForm } from 'react-hook-form';

function SignUp() {
  const dispatch= useDispatch()

  const [hidepassword,setHidePassword]=useState(true)
  const [hideConfirmpassword,setHideConfirmPassword]=useState(true)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState:{errors},
  }=useForm({mode: "onSubmit"});

  const password=watch("password","") //! track password to compare

  
  const SubmitForm = async (data) => { 
    console.log('data--->',data)
    
    console.log('data.image[0]--->',data.image[0]);
    


    //^ WRONG HOGA BECAUSE ONLY NAME SHOW VO BHI 'B' 'H' 'U' 'V' THIS WAY
    //dispatch(authAction.setSignupData(data.name,data.email,data.image[0].name,data.password,data.confirmPassword))

    //if(data.image.length!==0){
      dispatch(authAction.setSignupData({
        name: data.name,
        email: data.email,
        image:data.image[0],
        password: data.password,
        confirmPassword: data.confirmPassword, 
      }));
    //}

    // else{
    //   dispatch(authAction.setSignupData({
    //     name: data.name,
    //     email: data.email,
    //     image:'',
    //     password: data.password,
    //     confirmPassword: data.confirmPassword,
    //   }));
    // }

   

   
   //  !    Using Fetch 

   //^   const savedResponse=await fetch("http://localhost:5000/api/v1/otp", {
   //^     method: "POST",
   //^     headers: {
   //^       "Content-Type": "application/json",
   //^     },
   //^     body: JSON.stringify({ ...formData}),
   //^   });
   //^   console.log('savedResponse SignUp 37----->',savedResponse)
    
   //^   if(savedResponse.status===200){
   //^     navigate("/dashboard")
   //^     toast.success("User Register Successfully")
   //^   }
   //^   else{
   //^     toast.error("User not registered")
   //^   }
   //^ };


   // ! Using Axios

   await axios.post("https://advance-todo-backend-m28l.onrender.com/api/v1/otp",{ email: data.email })
    .then((response)=>{
     console.log('Signup Response--->',response);

      alert(response.data.message)
      navigate("/verifyemail")
      toast.success(response.data.message)
   })
   .catch((error)=>{
      toast.error("User Cant't Register Successfully")
       console.log(error.message)   
   }) 
  }

                      

return (
  <div className="container">
    <form onSubmit={handleSubmit(SubmitForm)} className="form">

      <label htmlFor="name" className="d-flex">Name: </label>
      <input
        id="name"
        type="text"
        {...register('name',{
          required:true,
          minLength:{value:3,message:'Minimum Length of Name should be 3'},
        })}/>
       {errors.name && <span style={{ color: 'red',marginLeft:"20px" }}> {errors.name.message}</span>}
      
      <label htmlFor="email" className="d-flex">Email: </label>
        <input id="email"
         type="email"
          {...register('email',{
            required:true,
          })}/>
          {errors.email && <span style={{ color: 'red',marginLeft:"20px" }}>Please enter the email</span>}

        <label htmlFor="photo">Upload Picture: </label>
        <input id="photo" type="file" accept="image/*" {...register('image')}  />

        <div className="d-flex">
          <label htmlFor="password" style={{marginLeft:"20px"}} >Password:  </label>
        
          <input id="password" type={hidepassword?"password":"text"} 
            {...register('password',{
            required:true,
            minLength:{val:6,message:'Please enter 6 digit passsword'},
          })} />
          <span onClick={()=>setHidePassword((prev)=>!prev)}>
            {hidepassword?<FaEye/>:<FaEyeSlash/>}
          </span>

        </div>
        {errors.password && <span style={{ color: 'red',marginLeft:"20px" }}>{errors.password.message}</span>}
       

        <div className="d-flex">
          <label htmlFor="confirmpassword" style={{marginLeft:"20px"}} className="d-flex"> Confirm Password:  </label>
          
          <input id="confirmpassword" type={hideConfirmpassword?"password":"text"}  {...register('confirmPassword',{
            required:true,  //{/*//!  Validate the Password and ConfirmPassword*/}
            minLength:{val:6,message:'Please enter 6 digit passsword'},
            validate: (value) => value === password || "Password and ConfirmPassword do not match",
          })}/>
          <span onClick={()=>setHideConfirmPassword((prev)=>!prev)}>
            {hideConfirmpassword?<FaEye/>:<FaEyeSlash/>}
          </span>

        </div>
        {errors.confirmPassword && <span style={{ color: 'red',marginLeft:"20px" }}>{errors.confirmPassword.message}</span>}
       
      
      <button type="submit">Submit</button>
      <button className="newUserButton" onClick={() => navigate("/")}>Already User</button>
    </form>
     
  </div>
);
}

export default SignUp;