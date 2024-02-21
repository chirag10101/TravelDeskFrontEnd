import {useEffect} from "react";
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ProtectedRouteManager = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    
  }

  if (!token) return <Navigate to="/login" />;

  

  const decodedData = jwtDecode(token);


  if (decodedData.role === "Manager") {
    return <Outlet {...props} />;
  }
 else if(decodedData.role!=="Manager"){
   //presentPage()
   //navigate('/request');
   navigate('/unauthorised');
  }
};

export default ProtectedRouteManager;