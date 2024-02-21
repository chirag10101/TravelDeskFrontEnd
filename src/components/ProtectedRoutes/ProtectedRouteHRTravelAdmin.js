import {useEffect} from "react";
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ProtectedRouteHRTravelAdmin = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    
  }

  if (!token) return <Navigate to="/login" />;

  

  const decodedData = jwtDecode(token);


  if (decodedData.role === "HRTravelAdmin") {
    return <Outlet {...props} />;
  }
 else if(decodedData.role!=="HRTravelAdmin"){
   //presentPage()
   //navigate('/request');
   navigate('/unauthorised');
  }
};

export default ProtectedRouteHRTravelAdmin;