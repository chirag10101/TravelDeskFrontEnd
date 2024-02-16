import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import {  Modal, Button } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { useLocation } from "react-router-dom";

async function GetAllActiveUsers(setUsers){
        const response = await axios.get("http://localhost:26429/api/user/active",{
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
        }});
        setUsers(response.data);
        return response.data;
}

async function GetAllRoles(setRoles){
    const response = await axios.get("http://localhost:26429/api/role",{
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
    }});
        setRoles(response.data);
        return response.data;
}

async function Delete( id,setUsers){
    const response = await axios.get("http://localhost:26429/api/user/delete/"+id,{
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
    }});
    GetAllActiveUsers(setUsers);
    return response;
}



const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const {decodedToken,setDecodedToken} = useUserContext();
    const navigate = useNavigate();
    const EditOnClick = (id) =>{
        
        navigate("/edituser/" + id);
    }

    const ViewOnClick = (id) =>{
        
      navigate("/viewuser/" + id);
  }

  const showDeleteConfirmationModal = (id) => {
    setDeleteId(id);
    setDisplayConfirmationModal(true);
  }

  const hideDeleteConfirmationModal = () => {
    setDeleteId(null);
    setDisplayConfirmationModal(false);
  }

  const confirmDelete = () => {
    Delete(deleteId, setUsers);
    hideDeleteConfirmationModal();
  }

  
    useEffect(() => {
        console.log(decodedToken);
        GetAllRoles(setRoles);
        GetAllActiveUsers(setUsers);
        
        // eslint-disable-next-line
      }, []);
  return (
    <div className="vh-100">
        <div className="container">
        <h1 className="text-center">All Users</h1>
      <table className="table table-striped table-hover table-info">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Role</th> 
            <th scope="col">Manager</th>
            <th scope="col">Department</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
            {
                users.map((user)=>(
                    <tr>
                    <th scope="row">{user.userId}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.roleName}</td>
                    <td>{user.mangerName}</td>
                    <td>{user.departmentName}</td>
                    <td> <button className="btn p-0"> <FontAwesomeIcon icon={faPenToSquare} onClick={()=>EditOnClick(user.userId)}/> </button>
                    <button className="btn p-0 ms-3"> <FontAwesomeIcon icon={faEye} onClick={()=>ViewOnClick(user.userId)} /> </button>
                    <button className="btn p-0 ms-3" onClick={()=> showDeleteConfirmationModal(user.userId)}> <FontAwesomeIcon icon={faTrash} /> </button>
                    </td>
                  </tr>
                ))
            }
        </tbody>
      </table>
      <Modal show={displayConfirmationModal} onHide={hideDeleteConfirmationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideDeleteConfirmationModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
    </div>
    
  );
};

export default AllUsers;
