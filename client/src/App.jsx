import {Routes, Route, Navigate} from "react-router-dom"
import Login from './User/Login'
import Signup from './User/Signup'
import './App.css'
import List from "./component/List"
import Navbar from "./Navbar/Navbar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authAction } from "./store"
import VerifyEmail from "./User/VerifyEmail"

function App() {
  
 const dispatch=useDispatch()
  // !             IMPORTANT CONCEPT

  //^  During refresh the page id(user who login) remain store in sessionStorage but
  //^  if you refresh after login then navbar change from logout--->login signup
  //^  to prevent this change we use useEffect

  useEffect(()=>{
   const id= sessionStorage.getItem("id")
   if(id){
    dispatch(authAction.login())
   }
   
  },[])
 
  return (
  <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<List/>}/>
      <Route path="/verifyemail" element={<VerifyEmail/>}/>
    </Routes>
  </>
    
  )
}

export default App
