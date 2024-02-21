import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

async function GetRequestById(id) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetTravelRequestByRequestId/" + id
  );
  return response.data;
}

async function GetAirTicketOnlyRequest(id) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetAirTicketOnlyRequest/" + id
  );
  return response.data;
}

async function GetHotelOnlyRequest(id) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetHotelOnlyRequest/" + id
  );
  return response.data;
}

async function GetAirTicketHotelBothRequest(id) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetAirHotelBothRequest/" + id
  );
  return response.data;
}

const ViewRequest = () => {
  const { id } = useParams();
  const [request, setRequest] = useState();
  const [viewrequest, setViewRequest] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetRequestById(id);
        if (data.result.bookingTypeId == "1") {
          const viewData = await GetAirTicketOnlyRequest(id);
          setViewRequest(viewData);
        } else if (data.result.bookingTypeId == "2") {
          const viewData = await GetHotelOnlyRequest(id);
          setViewRequest(viewData);
        } else if (data.result.bookingTypeId == "3") {
          const viewData = await GetAirTicketHotelBothRequest(id);
          setViewRequest(viewData);
        }
        setRequest(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    //console.log(request);
  }, []);

  if (request != null && viewrequest != null) {
    console.log(request.result.bookingTypeId);
    console.log(viewrequest);

    return (
      
      <div>
        <div className="container row">
        <h1 className="m-3">Details Of Request</h1>
        
        {/* Section 1: Basic Details */}
        <div className="col">
          <table className="table w-75 m-3">
            <thead>
              <tr>
                <th scope="col" className="w-25">
                  User ID
                </th>
                <th scope="col">{request.result.userId}</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Employee Name</th>
                <td colSpan={2}>{viewrequest.employeeName}</td>
              </tr>
              <tr>
                <th>Request Id</th>
                <td colSpan={2}>{viewrequest.requestId}</td>
              </tr>
              <tr>
                <th>reason For Travelling</th>
                <td colSpan={2}>{viewrequest.reasonForTravelling}</td>
              </tr>
              <tr>
                <th>Manager Name</th>
                <td colSpan={2}>{viewrequest.managerName}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td colSpan={2}>{viewrequest.statusName}</td>
              </tr>
              <tr>
                <th>Department</th>
                <td colSpan={2}>{viewrequest.departmentName}</td>
              </tr>
              <tr>
                <th>Booking Type</th>
                <td colSpan={2}>{viewrequest.bookingTypeName}</td>
              </tr>
              
              </tbody>
            {/* ... (Basic details table structure) */}
          </table>
        </div>

        {/* Section 2: Additional Details */}
        <div className="col">
          <table className="table w-75 m-3">
            {/* ... (Additional details table structure) */}
            <tbody>
            <tr>
                <th>Aadhaar No</th>
                <td colSpan={2}>{viewrequest.aadharNo}</td>
              </tr>
            {(request.result.bookingTypeId == "1" ||
                request.result.bookingTypeId == "3") && (
                <>
                  <tr>
                    <th>Flight Type</th>
                    <td colSpan={2}>{viewrequest.flightTypeName}</td>
                  </tr>
                  <tr>
                    <th>From</th>
                    <td colSpan={2}>{viewrequest.from}</td>
                  </tr>
                  <tr>
                    <th>To</th>
                    <td colSpan={2}>{viewrequest.to}</td>
                  </tr>
                  {request.result.flightTypeId == "2" && (
                    <tr>
                      <th>PassPort</th>
                      <td colSpan={2}>{viewrequest.passportNo}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Flight Date</th>
                    <td colSpan={2}>{viewrequest.flightDate}</td>
                  </tr>
                </>
              )}
              {(request.result.bookingTypeId == "2" ||
                request.result.bookingTypeId == "3") && (
                <>
                  <tr>
                    <th>Number Of Days</th>
                    <td colSpan={2}>{viewrequest.numberOfDays}</td>
                  </tr>
                  <tr>
                    <th>Hotel Date</th>
                    <td colSpan={2}>{viewrequest.hotelDate}</td>
                  </tr>
                  <tr>
                    <th>Meal Preference </th>
                    <td colSpan={2}>{viewrequest.mealPreferenceName}</td>
                  </tr>
                  <tr>
                    <th>Meal Type</th>
                    <td colSpan={2}>{viewrequest.mealTypeName}</td>
                  </tr>
                  <tr>
                    <th>Hotel Location</th>
                    <td colSpan={2}>{viewrequest.hotelLocationName}</td>
                  </tr>
                </>
              )}
              <tr>
                <th>Request Created On</th>
                <td colSpan={2}>{viewrequest.createdOn}</td>
              </tr>
              {
                viewrequest.statusName == "Rejected" && <tr>
                <th>Reason</th>
                <td colSpan={2}>{viewrequest.reasonForRejection}</td>
              </tr>
              }
               {
                viewrequest.statusName == "Accepted" && <tr>
                <th>Booking ID</th>
                <td colSpan={2}>{viewrequest.bookingId}</td>
              </tr>
              }
            </tbody>
            
          </table>
        </div>
      </div>
        
      </div>
    );
  }
};

export default ViewRequest;
