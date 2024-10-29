
import './SignUp.css';

import { useState,useEffect } from 'react';
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import {useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { authAction } from '../store';

function VerifyEmail() {
  const dispatch= useDispatch()

  const navigate=useNavigate()
  const [otp, setOtp] = useState('');

  const signupData=useSelector((state)=>state.signupData)
  console.log('signupData----->',signupData)

  const formData = new FormData();
  formData.append("name", signupData.name);
  formData.append("email", signupData.email);
  formData.append("password", signupData.password);
  formData.append("confirmPassword", signupData.confirmPassword);
  formData.append("image", signupData.image)
  formData.append('otp',otp)


  
  const VerifyData={...signupData,otp}
  console.log('VerifyData--->',VerifyData)
 
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const sendOtp=async(event)=>{
    event.preventDefault();

    await axios.post("https://advance-todo-backend-m28l.onrender.com/api/v1/otp",signupData.email)

    .then((response)=>{
     console.log('VerifyEmail Response--->',response);

      alert(response.data.message)
      navigate("/dashboard")
      toast.success(response.data.message)
   })
   .catch((error)=>{ //^ response.data.status!==200  then run
      toast.error("User Cant' get OTP Successfully")
       console.log(error.message)    
   }) 
  }

  const handlerVerifyAndSignup=async(e)=>{
    e.preventDefault()

    await axios.post("https://advance-todo-backend-m28l.onrender.com/api/v1/signup", formData, { //VerifyData
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    .then((response)=>{
     console.log(response);

      alert(response.data.message)

      sessionStorage.setItem("id",response.data.data._id)
      dispatch(authAction.login())
      navigate("/dashboard")
      toast.success(response.data.message)
   })
   .catch((error)=>{ 
      toast.error("User Cant' get OTP Successfully")
       console.log(error.message)   
   }) 
  }


  return (
    <div className='container'>
      <p> A verification code has been sent to you. Enter the code below</p>

      <form onSubmit={handlerVerifyAndSignup}>
      <OtpInput
       value={otp}
       onChange={setOtp}
       inputStyle={{ width: '2rem', height: '2rem', fontSize: '1.5rem', margin: '0.5rem' }}
       numInputs={6}
       renderSeparator={<span>-</span>}
       renderInput={(props) => <input {...props} />}
    />
          
         
        <button type='submit'>Verify Email</button>
      </form>
 
      <div className='d-flex m-4'>
        <Link to="/signup">
          <button className=" mx-3 text-richblack-5 flex items-center gap-x-2">
            <BiArrowBack /> Back To Signup 
          </button>

        </Link>
          <button className="flex items-center  gap-x-2" onClick={() =>sendOtp(signupData.email) }> 
            <RxCountdownTimer />
            Resend it
          </button>
      </div>

    </div>
  )
}


export default VerifyEmail