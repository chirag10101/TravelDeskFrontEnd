import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

async function GetUserById(id) {
  const response = await axios.get("http://localhost:26429/api/user/"+id);
  //console.log(response);
  return response.data;
}

async function GetRoleById(id) {
  const response = await axios.get("http://localhost:26429/api/role/"+id);
  return response.data;
}

async function GetDepartmentById(id) {
  const response = await axios.get("http://localhost:26429/api/department/"+id);
  return response.data;
}

const DetailsUser = () => {
  const { id } = useParams();
  const [user,setUser] = useState();
  const [manager, setManager] = useState();
  const [role, setRole] = useState();
  const [department, setDepartment] = useState();
  useEffect(() => {
    const fetchData = async () => {
        try {
          const userData = await GetUserById(id);
          console.log(userData);
          setUser(userData);
          //console.log(userData.managerId);
          const managersData = await GetUserById(userData.managerId);
          console.log(managersData);
          setManager(managersData);
          //console.log(manager);
          const roleData = await GetRoleById(userData.roleId);
          setRole(roleData);
          const departmentData = await GetDepartmentById(userData.departmentId);
          setDepartment(departmentData);
        } catch (error) {
          console.error("Error fetching data:", error);
        };
    } 
    fetchData();
  },[]);  
  if(user!=null&&manager!=null&&role!=null&&department!=null){
    console.log(department);
    console.log(role);
    return (
      <div className="container ">
        <h1 className="m-3">Details Of user</h1>
        <table class="table w-75 m-3">
          <thead>
            <tr>
              <th scope="col" className="w-25">User ID</th>
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
    );
  }
};

export default DetailsUser;
