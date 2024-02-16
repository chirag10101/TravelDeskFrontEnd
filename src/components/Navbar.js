import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../UserContext.js";

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
    localStorage.removeItem('token');
    
    navigate('/login',{ state: { LoggedOut: true} });
    setDecodedToken(null);
  }

  const OnRequestFormClick = () => {
    navigate('/request');
  }

  const OnRequestHistoryClick = () => {
    navigate('/requesthistory');
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
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {decodedToken.role === "Employee" && <li><a href="#" class="nav-link px-2 text-secondary " onClick={() => OnHomeClick()}>Home</a></li>}
              {/* <li><a href="#" class="nav-link px-2 text-white" onClick={() => OnAddUserClick()}>Add User</a></li>
              <li><a href="#" class="nav-link px-2 text-white" onClick={() => OnHomeClick()}>Show All users</a></li> */}
              
              {decodedToken.role === "Admin" && <li><a href="#" class="nav-link px-2 text-white " onClick={() => OnAddUserClick()}>Add User</a></li>}
              {decodedToken.role === "Admin" && <li><a href="#" class="nav-link px-2 text-white " onClick={() => OnHomeClick()}>Show All users</a></li>}
              {decodedToken.role === "Employee" && <li><a href="#" class="nav-link px-2 text-white" onClick={() => OnRequestFormClick()}>RequestForm</a></li> }
              {decodedToken.role === "Employee" && <li><a href="#" class="nav-link px-2 text-white" onClick={() => OnRequestHistoryClick()}>Request History</a></li> }
            </ul>
            <div class="text-end">
              <button type="button" class="btn btn-outline-info" onClick={() => OnLogOutClick()}>Log-out</button>
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
