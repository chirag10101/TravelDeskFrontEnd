import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

async function EditUser(user,id) {
  var temp = JSON.stringify({
    userId: id,
    firstName: user.firstname,
    lastName: user.lastname,
    address: user.address,
    mobileNumber: user.mobilenumber,
    email: user.email,
    password: user.password,
    createdBy: 12,
    updatedBy: 12,
    isActive: true,
    roleId: parseInt(user.role),
    departmentId: parseInt(user.department),
    managerId: parseInt(user.manager),
  });
  const result = await axios.put("http://localhost:26429/api/user/edit", temp, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(result);
}

async function GetRoles(setRoles) {
  const response = await axios.get("http://localhost:26429/api/role");
  setRoles(response.data);
  return response.data;
}

async function GetUserById(id) {
    const response = await axios.get("http://localhost:26429/api/user/"+id);
    return response.data;
}

async function GetDepartments(setDepartments) {
  const response = await axios.get("http://localhost:26429/api/department");
  setDepartments(response.data);
  return response.data;
}

async function GetManagers(setManagers) {
  const response = await axios.get("http://localhost:26429/api/user/manager");
  setManagers(response.data);
  return response.data;
}

const UserSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(/^[a-zA-Z ]+$/, "Should contain only alphabets"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(/^[a-zA-Z ]+$/, "Should contain only alphabets"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  mobilenumber: Yup.string().required("Required")
  .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/,"Enter valid Mobile Number"),
  
  role: Yup.number().required("Required"),
  department: Yup.number().required("Required"),
  manager: Yup.number().required("Required"),
});

const Edit = () => {
    const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [edituser, setEditUser] = useState();
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  console.log(id);
  const navigate= useNavigate();
  
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          const rolesData = await GetRoles(setRoles);
          const departmentsData = await GetDepartments(setDepartments);
          const managersData = await GetManagers(setManagers);
          const userData = await GetUserById(id);
          setEditUser(userData);
        } catch (error) {
          console.error("Error fetching data:", error);
        };
    }
        
        fetchData();
    // eslint-disable-next-line
  }
  , []);

  if(edituser!=null){
    console.log(JSON.stringify(edituser));
    console.log(edituser.firstName);
    console.log(edituser.managerId);
    return (
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          id="main"
        >
          <div className="w-50 p-4 bg-success-subtle m-4 rounded-4" id="formdiv">
            <h1 className="text-center" id="adduserheading">
              Edit User
            </h1>
            <hr className="section-break-3" />
            <Formik
              initialValues={{
                firstname: edituser.firstName,
                lastname: edituser.lastName,
                address: edituser.address,
                mobilenumber: edituser.mobileNumber,
                email: edituser.email,
                password: edituser.password,
                role: parseInt(edituser.roleId),
                department: parseInt(edituser.departmentId),
                manager: parseInt(edituser.managerId)
              }}
              validationSchema={UserSchema}
              onSubmit={async (values) => {
                //AddUser(values);
                try {
                    const result = await EditUser(values,edituser.userId);
                    navigate('/showusers');
                  } catch (error) {
                    console.error("Error submitting form:", error);
                  }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="row">
                    <div className="form-group m-2 col">
                      <label>
                        <h6>First Name</h6>
                      </label>
                      <Field
                        type="text"
                        className="form-control inputs border-1 border-info "
                        name="firstname"
                        id="firstnameinput"
                        placeholder="Enter First Name"
                      />
                      {errors.firstname && touched.firstname ? (
                        <div className="text-danger">{errors.firstname}</div>
                      ) : null}
                    </div>
                    <div className="form-group m-2 ms-0 col">
                      <label>
                        <h6>Last Name</h6>
                      </label>
                      <Field
                        type="text"
                        className="form-control inputs border-1 border-info"
                        name="lastname"
                        id="lastnameinput"
                        placeholder="Enter Last Name"
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="text-danger">{errors.lastname}</div>
                      ) : null}
                    </div>
                  </div>
    
                  <div className="form-group m-2">
                    <label>
                      <h6>Address</h6>
                    </label>
                    <Field
                      as="textarea"
                      className="form-control inputs border-1 border-info"
                      id="addressInput"
                      placeholder="Enter address"
                      name="address"
                    ></Field>
                    {errors.address && touched.address ? (
                      <div className="text-danger">{errors.address}</div>
                    ) : null}
                  </div>
                  <div className="form-group m-2">
                    <label>
                      <h6>Mobile Number</h6>
                    </label>
                    <Field
                      type="text"
                      className="form-control inputs border-1 border-info"
                      id="mobilenumberInput"
                      placeholder="Enter mobile Number "
                      name="mobilenumber"
                    />
                    {errors.mobilenumber && touched.mobilenumber ? (
                      <div className="text-danger">{errors.mobilenumber}</div>
                    ) : null}
                  </div>
                  <div className="form-group ms-0 me-0 p-0 m-2 row">
                    <div className="col ms-0">
                      <label>
                        <h6>Role</h6>
                      </label>
                      <Field
                        as="select"
                        id="select-role"
                        className="form-select  inputs border-1 border-info"
                        name="role"
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => {
                            return (
                              <option value={role.roleId}>{role.roleName}</option>
                            );
                        })}
                      </Field>
                      {errors.role && touched.role ? (
                        <div className="text-danger">{errors.role}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label>
                        <h6>Department</h6>
                      </label>
                      <Field
                        as="select"
                        id="select-department"
                        className="form-select  inputs border-1 border-info"
                        name="department"
                      >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                          <option value={department.departmentId}>
                            {department.departmentName}
                          </option>
                        ))}
                      </Field>
                      {errors.department && touched.department ? (
                        <div className="text-danger">{errors.department}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group m-2">
                    <label>
                      <h6>Manager</h6>
                    </label>
                    <Field
                      as="select"
                      id="select-manager"
                      className="form-select  inputs border-1 border-info"
                      name="manager"
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option value={manager.userId}>
                          {manager.userId}-{manager.firstName} {manager.lastName}
                        </option>
                      ))}
                    </Field>
                    {errors.manager && touched.manager ? (
                      <div className="text-danger">{errors.manager}</div>
                    ) : null}
                  </div>
                  
                  <div className="d-flex justify-content-center mb-2 m-4">
                    <button type="submit" className="btn btn-primary w-25">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      );
  }
  
};

export default Edit;
