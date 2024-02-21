import React , {useEffect, useState} from 'react'
import { useUserContext } from '../UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {  Modal, Button, Pagination } from "react-bootstrap";



async function GetAllPastRequests(userId,setRequests){
    const response = await axios.get("http://localhost:26429/api/travelrequest/GetHistoryRequestsByUserId/"+userId,{
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
    }});
    console.log("dlksj");
    console.log(response.data);
    setRequests(response.data.reverse());
    return response.data;
}
 
async function GetUserById(id) {
    const response = await axios.get("http://localhost:26429/api/user/"+id);
    //console.log(response);
    return response.data;
  }

async function Delete( id,currentUserId,setRequests ){
    const response = await axios.put("http://localhost:26429/api/travelrequest/DeleteRequest/"+id,{
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
    }});
    GetAllPastRequests(currentUserId,setRequests);
    return response;
}
  
const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const {decodedToken, setDecodedToken} = useUserContext();
    const [currentUserId,setCurrentUserId] = useState();
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(5); 

    const navigate = useNavigate();

    const ViewOnClick = (id) =>{
        navigate("/viewrequest/" + id);
    }

    const showDeleteConfirmationModal = (id) => {
        setDeleteId(id);
        setDisplayConfirmationModal(true);
      }
    
      const hideDeleteConfirmationModal = () => {
        setDeleteId(null);
        setDisplayConfirmationModal(false);
      }
    
      const confirmDelete =  () => {
        debugger;
        Delete(deleteId ,currentUserId,setRequests);
        hideDeleteConfirmationModal();
      }
  
    useEffect( () => {
        var token = localStorage.getItem('token');
        var dt = jwtDecode(token);
        setCurrentUserId(parseInt(dt.userId)); //
        setDecodedToken(dt);

        const fetchData = async () => {
            try {
              const data = await GetAllPastRequests(currentUserId,setRequests);
              
              console.log(data);
              console.log(requests);
            } catch (error) {
              console.error('Error setting past requests:', error);
            }
          };
      
          fetchData();
        // eslint-disable-next-line
    }, [currentUserId]);

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
 
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
    <div>
        {
            requests && <div className="vh-100">
            <div className="container">
            <h1 className="text-center">Request History</h1>
          <table className="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Request Id</th>
                <th scope="col">Reason For Travelling</th> 
                <th scope="col">Manager</th>
                <th scope="col">Status</th>
                <th scope="col">Booking Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
                {
                    currentRequests.map((request)=>(
                        <tr>
                        <th scope="row">{request.requestId}</th>
                        <td>{request.reasonForTravelling}</td>
                        <td>{request.managerName}</td>
                        <td>{request.statusName}</td>
                        <td>{request.bookingTypeName}</td>
                        <td> 
                        {/* {
                            request.statusName == "Rejected" &&  <button className="btn p-0 text-white" > <FontAwesomeIcon icon={faPenToSquare} /> </button>
                        }  */}
                        <button className="btn p-0 ms-3 text-white" onClick={()=>ViewOnClick(request.requestId)} > <FontAwesomeIcon icon={faEye}/> </button>
                        <button className="btn p-0 ms-3 text-white" onClick={()=> showDeleteConfirmationModal(request.requestId )}> <FontAwesomeIcon icon={faTrash} /> </button>
                        </td>
                      </tr>
                    ))
                }
            </tbody>
          </table>
          <Pagination className="justify-content-center">
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(Math.ceil(requests.length / requestsPerPage)).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(requests.length / requestsPerPage)} />
                </Pagination>
          <Modal show={displayConfirmationModal} onHide={hideDeleteConfirmationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this request?
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
        
        }
        </div>

    
  )
}

export default RequestHistory