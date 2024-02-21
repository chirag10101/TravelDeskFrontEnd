import React from "react";
import { useState, useEffect } from "react";
import { useUserContext } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function GetAllHRTravelAdminRequests() {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetAllHRTravelAdminRequests",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  console.log(response.data);
  //setRequests(response.data);
  return response.data;
}

const HRTravelAdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const { decodedToken, setDecodedToken } = useUserContext();
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [action, setAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const navigate = useNavigate();

  const showAcceptConfirmationModal = (id) => {
    //setDeleteId(id);
    setSelectedRequestId(id);
    setDisplayConfirmationModal(true);
  }

  const hideAcceptConfirmationModal = () => {
    setSelectedRequestId(null);
    const statusDropdown = document.getElementById("statusDropdown");
    if (statusDropdown) {
      statusDropdown.value = "";
    }
    setDisplayConfirmationModal(false);
  }

  const confirmAccept = async () => {
    //Delete(deleteId, setUsers);
    //selectedRequestId
    var temp = {
        requestId: selectedRequestId,
        statusId: parseInt(action),
        statusReason: "",
        updatedBy: decodedToken.userId,
      };
  
      const result = await axios.put(
        "http://localhost:26429/api/travelrequest/GenerateBookingId/" + selectedRequestId,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      if (result.status == 200) {
        console.log("Booking Id Generated Successfully");
        const data = await GetAllHRTravelAdminRequests(parseInt(decodedToken.userId));
        setRequests(data);
      }
      // You can handle further logic here, like sending a request to your server
      setSelectedRequestId(null);
      setRejectionReason("");
    hideAcceptConfirmationModal();
  }

  

  const ViewOnClick = (id) =>{
    navigate("/viewrequest/" + id);
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          setDecodedToken(decodedToken);

          const data = await GetAllHRTravelAdminRequests();
          console.log("use effect");
          console.log(data);
          setRequests(data);
        } else {
        }
      } catch (error) {
        console.error("Error setting past requests:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);
  if(requests!= null){
    return (
        <div className="manager-dashboard container">
          <h2>Travel HR Admin Dashboard</h2>
          <table className="request-table table" id="requestTable">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Request Id</th>
                <th>Employee Name</th>
                <th>Manager Name</th>
                <th>Reason for Traveling</th>
                <th>Booking Type</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.userId}</td>
                  <td>{request.requestId}</td>
                  <td>{request.employeeName}</td>
                  <td>{request.managerName}</td>
                  <td>{request.reasonForTravelling}</td>
                  <td>{request.bookingTypeName}</td>
                  <td>
                    <button className="btn border-1 border-black" onClick={()=>ViewOnClick(request.requestId)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                  <td>
                    {request.bookingId != null && <button className="btn btn-light border-1 border-black" >
                      Booked
                    </button> }
                    {request.bookingId == null && <button className="btn btn-success border-1 border-black" onClick={()=>showAcceptConfirmationModal(request.requestId)}>
                      Book
                    </button> }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Modal
            show={displayConfirmationModal}
            onHide={hideAcceptConfirmationModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Booking Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to book this request?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideAcceptConfirmationModal}>
                Cancel
              </Button>
              <Button variant="success" onClick={confirmAccept}>
                {}
                Book
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
  }
  
};

export default HRTravelAdminRequests;
