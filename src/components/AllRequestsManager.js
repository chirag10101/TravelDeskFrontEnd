import React from "react";
import { useState, useEffect } from "react";
import { useUserContext } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button,Pagination } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";


async function GetAllManagerRequests(userId, setRequests) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetAllManagerRequests/" + userId,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  console.log(response.data);
  return response.data;
}

const AllRequestsManager = () => {
  const [requests, setRequests] = useState([]);
  const { decodedToken, setDecodedToken } = useUserContext();
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [action, setAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); 


  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const showAcceptConfirmationModal = (id) => {
    //setDeleteId(id);

    setDisplayConfirmationModal(true);
  }

  const hideAcceptConfirmationModal = () => {
    //setDeleteId(null);
    const statusDropdown = document.getElementById("statusDropdown");
    if (statusDropdown) {
      statusDropdown.value = "";
    }
    setDisplayConfirmationModal(false);
  }

  const confirmAccept = async () => {
    //Delete(deleteId, setUsers);
    var temp = {
        requestId: selectedRequestId,
        statusId: parseInt(action),
        statusReason: "",
        updatedBy: decodedToken.userId,
      };
  
      const result = await axios.put(
        "http://localhost:26429/api/travelrequest/UpdateStatusAndReason",
        JSON.stringify(temp),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      if (result.status == 200) {
        console.log("Status Updated Successfully");
        const data = await GetAllManagerRequests(parseInt(decodedToken.userId));
        setRequests(data.result);
      }
      // You can handle further logic here, like sending a request to your server
      setSelectedRequestId(null);
      setRejectionReason("");
    hideAcceptConfirmationModal();
  }

  const handleAction = (requestId, selectedAction) => {
    setSelectedRequestId(requestId);
    setAction(selectedAction);
    if (selectedAction === "3") {
      setShowModal(true);
    }else if (selectedAction === "2"){
        showAcceptConfirmationModal(requestId);
    }

  };

  const handleReject = async () => {
    console.log(
      `Rejecting request ID: ${selectedRequestId}, Reason: ${rejectionReason}`
    );
    setShowModal(false); // Close the modal after submitting
    var temp = {
      requestId: selectedRequestId,
      statusId: parseInt(action),
      statusReason: rejectionReason,
      updatedBy: decodedToken.userId,
    };

    const result = await axios.put(
      "http://localhost:26429/api/travelrequest/UpdateStatusAndReason",
      JSON.stringify(temp),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
    if (result.status == 200) {
      console.log("Status Updated Successfully");
      const data = await GetAllManagerRequests(parseInt(decodedToken.userId));
      setRequests(data.result);
    }
    // You can handle further logic here, like sending a request to your server
    setSelectedRequestId(null);
    setRejectionReason("");
  };

  const closeModal = () => {
    setAction("");
    setShowModal(false);
    setSelectedRequestId(null);
    setRejectionReason("");
    const statusDropdown = document.getElementById("statusDropdown");
    if (statusDropdown) {
      statusDropdown.value = "";
    }
  };

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

          const data = await GetAllManagerRequests(
            parseInt(decodedToken.userId)
          );
          setRequests(data.result);
        } else {
        }
      } catch (error) {
        console.error("Error setting past requests:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="manager-dashboard container">
      <h2>Manager Dashboard</h2>
      <table className="request-table table" id="requestTable">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Employee Name</th>
            <th>Request Id</th>
            <th>Reason for Traveling</th>
            <th>Booking Type</th>
            <th>Status</th>
            <th>Change status</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request.requestId}>
              <td>{request.userId}</td>
              <td>{request.employeeName}</td>
              <td>{request.requestId}</td>
              <td>{request.reasonForTravelling}</td>
              <td>{request.bookingTypeName}</td>
              <td>{request.statusName}</td>
              <td>
                <div className="select-with-icon">
                  {/* <FontAwesomeIcon className="select-icon" icon="chevron-down" /> */}
                  <select
                    id="statusDropdown"
                    className="form-select border-1 border-black"
                    onChange={(e) =>
                      handleAction(request.requestId, e.target.value)
                    }
                  >
                    {request.statusName == "Rejected" && (
                      <>
                        <option value="">Change Status</option>
                        <option value="2">Accept</option>
                      </>
                    )}
                    {request.statusName == "Pending" && (
                      <>
                        <option value="">Change Status</option>
                        <option value="2">Accept</option>
                        <option value="3">Reject</option>
                      </>
                    )}
                  </select>
                </div>
              </td>
              <td>
                <button className="btn border-1 border-black" onClick={()=>ViewOnClick(request.requestId)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </td>
            </tr>
          ))}
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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter reason for rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection..."
            style={{ width: "100%", height: "100px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReject}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={displayConfirmationModal}
        onHide={hideAcceptConfirmationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Accept Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to accept this request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideAcceptConfirmationModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmAccept}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllRequestsManager;
