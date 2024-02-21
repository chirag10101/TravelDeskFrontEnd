import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { Modal, Button, Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

async function GetAllActiveUsers(currentUserId) {
  const response = await axios.get("http://localhost:26429/api/user/ActiveUsersForManager/"+currentUserId, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
}

async function Delete(id, setUsers) {
  const response = await axios.put(
    "http://localhost:26429/api/user/delete/" + id,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
  return response;
}

const AllManagerUsers = () => {
  const [users, setUsers] = useState([]);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentUserId,setCurrentUserId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Change the number of users per page here
  const { decodedToken, setDecodedToken } = useUserContext();
  const navigate = useNavigate();

  const EditOnClick = (id) => {
    navigate("/edituser/" + id);
  };

  const ViewOnClick = (id) => {
    navigate("/viewuser/" + id);
  };

  const showDeleteConfirmationModal = (id) => {
    setDeleteId(id);
    setDisplayConfirmationModal(true);
  };

  const hideDeleteConfirmationModal = () => {
    setDeleteId(null);
    setDisplayConfirmationModal(false);
  };

  const confirmDelete = async () => {
    await Delete(deleteId, setUsers);
    toast.success("Deleted successfully", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    hideDeleteConfirmationModal();
  };

  useEffect(() => {
    var token = localStorage.getItem('token');
    var dt = jwtDecode(token);
    setCurrentUserId(parseInt(dt.userId)); //
    setDecodedToken(dt);
    GetAllActiveUsers(dt.userId).then((data) => setUsers(data.reverse()));
  }, []);

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    
    <div className="vh-100">
      <div className="container">
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
        <h1 className="text-center">All Users</h1>
        <table className="table table-striped table-hover table-info">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Manager</th>
              <th scope="col">Department</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {currentUsers.map((user) => (
              <tr key={user.userId}>
                <th scope="row">{user.userId}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.roleName}</td>
                <td>{user.mangerName}</td>
                <td>{user.departmentName}</td>
                <td>
                  
                  <button className="btn p-0 ms-3">
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => ViewOnClick(user.userId)}
                    />
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          />
        </Pagination>
        <Modal
          show={displayConfirmationModal}
          onHide={hideDeleteConfirmationModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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

export default AllManagerUsers;
