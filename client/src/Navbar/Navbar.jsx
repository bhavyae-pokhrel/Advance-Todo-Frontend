import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";


function Navbar() {

  const isLoggedIn=useSelector((state)=>state.isLoggedIn)

  const remove=()=>{
    sessionStorage.clear("id")
    dispatch(authAction.logout())
  }
  
  console.log(isLoggedIn)
  return (
   
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"white",bottom:'35px'}}>
        <div className="container-fluid">
        
          <Link className="navbar-brand" to="/"><b>TODO</b></Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {
                !isLoggedIn &&
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active" aria-current="page" to="/">Login</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
                  </li>
                </>
              }

              {
                isLoggedIn && 
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active" aria-current="page" to="/" onClick={remove}>Logout</Link>
                  </li>
                </>

              }
            </ul>
          </div>
        </div>
      </nav>
    
  );
}

export default Navbar;
