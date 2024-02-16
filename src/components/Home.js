import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllUsers from './AllUsers';
import User from './User';
import Navbar from './Navbar';
import Edit from './Edit';
import DetailsUser from './DetailsUser';
import { useEffect, useState } from 'react';
import ProtectedRouteAdmin from './ProtectedRoutes/ProtectedRouteAdmin';
import Login from './Login';
import RequestForm from './RequestForm';
import UnAuthorised from './UnAuthorised';
import ProtectedRouteEmployee from './ProtectedRoutes/ProtectedRouteUser';
import ProtectedRouteAdminManager from './ProtectedRoutes/ProtectedRouteAdminManager';
import { useUserContext } from '../UserContext';
import RequestHistory from './RequestHistory';
import ViewRequest from './ViewRequest';

const Admin = () => {

  const {decodedToken, setDecodedToken} = useUserContext();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("use effect called");
    setDecodedToken(storedToken);
  },[]);
  
  return (
    
    <Router>
      {
        decodedToken && <Navbar/>
      }
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route element={<ProtectedRouteAdminManager/>}>
              <Route path="/adduser" element={<User/>} />
            </Route>
            {/* <Route path="/showusers" element={<AllUsers/>} /> */}
            <Route element={<ProtectedRouteAdminManager/>}>
              <Route exact path="/showusers" element={<AllUsers />} />
            </Route>
            <Route element={<ProtectedRouteAdminManager/>}>
              <Route path="/edituser/:id" element={<Edit/>} />
            </Route>
            <Route element={<ProtectedRouteAdminManager/>}>
              <Route path="/viewuser/:id" element={<DetailsUser/>} />
            </Route>
            <Route element={<ProtectedRouteEmployee/>}>
              <Route path="/requesthistory" element={<RequestHistory/>} />
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route element={<ProtectedRouteEmployee/>}>
              <Route path="/request" element={<RequestForm/>}/>
            </Route>
            <Route path="/viewrequest/:id" element={<ViewRequest/>} />
            <Route path="/unauthorised" element={<UnAuthorised/>}/>
        </Routes>
      </Router>
  )
}

export default Admin