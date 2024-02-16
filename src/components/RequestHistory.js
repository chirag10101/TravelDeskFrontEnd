import React , {useEffect, useState} from 'react'
import { useUserContext } from '../UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

async function GetAllPastRequests(userId,setRequests){
    const response = await axios.get("http://localhost:26429/api/travelrequest/GetHistoryRequestsByUserId/"+userId,{
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
    }});
    console.log("dlksj");
    console.log(response.data);
    return response.data;
}

async function GetUserById(id) {
    const response = await axios.get("http://localhost:26429/api/user/"+id);
    //console.log(response);
    return response.data;
  }

  
const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const {decodedToken, setDecodedToken} = useUserContext();
    const navigate = useNavigate();

    const ViewOnClick = (id) =>{
        navigate("/viewrequest/" + id);
    }
  
    useEffect( () => {
        const fetchData = async () => {
            try {
                console.log(decodedToken);
              const data = await GetAllPastRequests(parseInt(decodedToken.userId));
              setRequests(data);
              console.log(data);
              console.log(requests);
            } catch (error) {
              console.error('Error setting past requests:', error);
            }
          };
      
          fetchData();
        // eslint-disable-next-line
    }, []);
  return (
    <div>
        <div className="vh-100">
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
                requests.map((request)=>(
                    <tr>
                    <th scope="row">{request.requestId}</th>
                    <td>{request.reasonForTravelling}</td>
                    <td>{request.managerName}</td>
                    <td>{request.statusName}</td>
                    <td>{request.bookingTypeName}</td>
                    <td> <button className="btn p-0 text-white" > <FontAwesomeIcon icon={faPenToSquare} /> </button>
                    <button className="btn p-0 ms-3 text-white" onClick={()=>ViewOnClick(request.requestId)} > <FontAwesomeIcon icon={faEye}/> </button>
                    <button className="btn p-0 ms-3 text-white" > <FontAwesomeIcon icon={faTrash} /> </button>
                    </td>
                  </tr>
                ))
            }
        </tbody>
      </table>
      
    </div>
    </div>
    </div>

    
  )
}

export default RequestHistory