import {useEffect} from "react";
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ProtectedRouteAdminManager = (props) => {
  //debugger;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    
  }

  if (!token) return <Navigate to="/login" />;

  // useEffect(()=>{
  //   // if(token && jwtDecode(token).role!== "admin"){ 
  //   //   presentPage()
  //   //   }
  // },[token && jwtDecode(token).role!== "admin"])

  const decodedData = jwtDecode(token);


  if (decodedData.role === "Admin" ||  decodedData.role === "Manager") {
    return <Outlet {...props} />;
  }
 else if(decodedData.role!=="Admin"){
   //presentPage()
   //navigate('/request');
   navigate('/unauthorised');
  }
};

export default ProtectedRouteAdminManager;