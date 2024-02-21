import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../UserContext.js";
import logo from '../assets/TravelLogo2.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const navigate = useNavigate();
  const {decodedToken, setDecodedToken} = useUserContext();
  const [currentRole, setCurrentRole] = useState();

  const OnHomeClick = () => {
    navigate('/showusers');
  }

  const OnAddUserClick = () => {
    navigate('/adduser');
  }

  const OnLogOutClick = () => {
    toast.success('Logout successfully', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      }); 
      setTimeout(async () => {
        localStorage.removeItem('token');
    
          navigate('/login',{ state: { LoggedOut: true} });
          setDecodedToken(null);
      }, 2000); 
    
  }

  const OnRequestFormClick = () => {
    navigate('/request');
  }

  const OnRequestHistoryClick = () => {
    navigate('/requesthistory');
  }
  const OnAllRequestClick = () => {
    navigate('/viewallrequests');
  }

  useEffect(() => {
    const tk = jwtDecode(localStorage.getItem('token'));
    setDecodedToken(tk);
    // Uncomment the following lines if you want to set the current role
    // if (decodedToken != null) {
    //   setCurrentRole(decodedToken.role);
    // }
  }, []);

  if (decodedToken != null && decodedToken.role != null) {
    //console.log(decodedToken.role);

    return (
      <header class="p-2 text-bg-dark">
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
          draggable
          pauseOnHover
        theme="light"
        />
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <img src={logo} id="LogoImg"></img>
              {/* {decodedToken.role === "Employee" && <li><a href="#" class="nav-link px-2 text-secondary " onClick={() => OnHomeClick()}>Home</a></li>} */}
              {/* <li><a href="#" class="nav-link px-2 text-white" onClick={() => OnAddUserClick()}>Add User</a></li>
              <li><a href="#" class="nav-link px-2 text-white" onClick={() => OnHomeClick()}>Show All users</a></li> */}
              <li className="nav ms-2 mt-1 fs-5">Travel Guide</li>
              
            </ul>
            <div class="text-end d-flex">
              <li className="nav-link ms-2 mt-1 me-2 fs-5">Hi, {decodedToken.firstName + " " + decodedToken.lastName}</li>
              <li className="nav-link"><button type="button" class="btn btn-outline-info" onClick={() => OnLogOutClick()}>Log-out</button></li>
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    // Handle the case when decodedToken is null
    return null;
  }
};

export default Navbar;
