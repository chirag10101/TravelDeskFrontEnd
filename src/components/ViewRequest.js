import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

async function GetRequestById(id) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/GetTravelRequestByRequestId/" + id
  );
  return response.data;
}

const ViewRequest = () => {
  const { id } = useParams();
  const [request, setRequest] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetRequestById(id);
        setRequest(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    //console.log(request);
  }, []);

  if (request != null) {
    console.log(request.result.bookingTypeId);

    return (
    <div>
        {/* {request.result.bookingTypeId == "1" && 
        <div className="container ">
        <h1 className="m-3">Details Of Request</h1>
        <table class="table w-75 m-3">
          <thead>
            <tr>
              <th scope="col" className="w-25">ID</th>
              <th scope="col">{user.userId}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th >First Name</th>
              <td colSpan={2}>{user.firstName}</td>
            </tr>
            <tr>
              <th >Last Name</th>
              <td colSpan={2}>{user.lastName}</td>
            </tr>
            <tr>
              <th >Address</th>
              <td colSpan={2}>{user.address}</td>
            </tr>
            <tr>
              <th >Email</th>
              <td colSpan={2}>{user.email}</td>
            </tr>
            <tr>
              <th >Mobile Number</th>
              <td colSpan={2}>{user.mobileNumber}</td>
            </tr>
            <tr>
              <th >Manager</th>
              <td colSpan={2}>{manager.firstName} {manager.lastName}</td>
            </tr>
            <tr>
              <th >Department</th>
              <td colSpan={2}>{department.departmentName}</td>
            </tr>
            <tr>
              <th >Role</th>
              <td colSpan={2}>{role.roleName}</td>
            </tr>
          </tbody>
        </table>
      </div>
        } */}
        </div>
    );
  }
};

export default ViewRequest;
