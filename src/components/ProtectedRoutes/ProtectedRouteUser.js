import {useEffect} from "react";
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ProtectedRouteEmployee = (props) => {
  //debugger;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    
  }

  if (!token) return <Navigate to="/login" />;

  const decodedData = jwtDecode(token);

  if (decodedData.role === "Employee") {
    return <Outlet {...props} />;
  }
  
 else if(decodedData.role!=="Employee"){
   //presentPage()
   //navigate('/request');
   navigate('/unauthorised');
  }
};

export default ProtectedRouteEmployee;