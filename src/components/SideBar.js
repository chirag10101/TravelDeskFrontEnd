import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink , useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
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
  const OnAllRequestClick = () => {
    navigate('/viewallrequests');
  }

  const OnAllHRRequestClick = () => {
    navigate('/viewallhrrequests');
  }
  const OnContactUsClick=()=>{
    navigate('/contactUs')
  }
  const OnAllMangerUsersClick=()=>{
    navigate('/allusersformanager')
  }

  useEffect(() => {
    const tk = jwtDecode(localStorage.getItem('token'));
    setDecodedToken(tk);
    // Uncomment the following lines if you want to set the current role
    // if (decodedToken != null) {
    //   setCurrentRole(decodedToken.role);
    // }
  }, []);

  if (decodedToken != null && decodedToken.role != null){
    return (
        <div id='sideBarMainDiv' style={{ display: 'flex', overflow: 'scroll initial' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a  className="text-decoration-none" style={{ color: 'inherit' }}>
                Travel Guide
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <div>
                    {decodedToken.role === "Admin" && <CDBSidebarMenuItem icon="columns" onClick={() => OnAddUserClick()}>Add User</CDBSidebarMenuItem>}
                    {decodedToken.role === "Admin" && <CDBSidebarMenuItem icon="table" onClick={() => OnHomeClick()} >Show All users</CDBSidebarMenuItem>}

                    {decodedToken.role === "Employee" && <CDBSidebarMenuItem icon="columns" onClick={() => OnRequestFormClick()} >Request Form</CDBSidebarMenuItem>}
               
                    {decodedToken.role === "Employee" && <CDBSidebarMenuItem icon="table" onClick={() => OnRequestHistoryClick()} >Request History</CDBSidebarMenuItem>}
                
                    {decodedToken.role === "Manager" && <CDBSidebarMenuItem icon="table" onClick={() => OnAllRequestClick()} >All Requests</CDBSidebarMenuItem>}
                    {decodedToken.role === "Manager" && <CDBSidebarMenuItem icon="table" onClick={() => OnAllMangerUsersClick()} >All Users</CDBSidebarMenuItem>}
                    {decodedToken.role === "HRTravelAdmin" && <CDBSidebarMenuItem icon="table" onClick={() => OnAllHRRequestClick()} >All Requests</CDBSidebarMenuItem>}
                     <CDBSidebarMenuItem icon="sticky-note" onClick={() => OnContactUsClick()} >Contact Us</CDBSidebarMenuItem>
                </div>
              </CDBSidebarMenu>
              
            </CDBSidebarContent>
    
            
          </CDBSidebar>
        </div>
        
      );
  }
  
};

export default Sidebar;