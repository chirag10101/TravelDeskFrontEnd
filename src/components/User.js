import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function CheckEmailInUsers(email) {
  try {
      
    const result = await axios.post(
      "http://localhost:26429/api/user/checkemail?email="+ email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    var res = await result.data;
    if (res == true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}


async function AddUser(user, navigate) {
  debugger;
  var check = await CheckEmailInUsers(user.email);
  if (check==true) {
    alert("Email Already exists");
  }else{
    var temp = JSON.stringify({
      firstName: user.firstname,
      lastName: user.lastname,
      address: user.address,
      mobileNumber: user.mobilenumber,
      email: user.email,
      password: user.password,
      createdBy: 12,
      isActive: true,
      roleId: parseInt(user.role),
      departmentId: parseInt(user.department),
      managerId: parseInt(user.manager),
    });
    const result = axios.post("http://localhost:26429/api/user", temp, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.info('User Added successfully', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      }); 
      setTimeout(async () => {
        navigate("/showusers");
        console.log(result);
      }, 1500); 
    
  }

  
}

async function GetRoles(setRoles) {
  const response = await axios.get("http://localhost:26429/api/role");
  setRoles(response.data);
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
  mobilenumber: Yup.string()
    .required("Required")
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Enter valid Mobile Number"),
  email: Yup.string()
    .required("Required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter valid email address"
    ),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-z]/, "Password must contain at least one lowercase char.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase char.")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "at least 1 number or special char (@,!,#, etc)."
    ),
  retypepassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  role: Yup.number().required("Required"),
  department: Yup.number().required("Required"),
  manager: Yup.number().required("Required"),
});

const User = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetRoles(setRoles);
    GetDepartments(setDepartments);
    GetManagers(setManagers);
    // eslint-disable-next-line
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      id="main"
    >
      <div className="p-4 bg-success-subtle m-4 rounded-4" id="formdiv">
        <h4 className="text-center" id="adduserheading">
          Add User
        </h4>
        <hr className="section-break-4 m-1" />
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            address: "",
            mobilenumber: "",
            role: "",
            department: "",
            manager: "",
            email: "",
            password: "",
          }}
          validationSchema={UserSchema}
          onSubmit={(values) => {
            AddUser(values, navigate);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="form-group m-2  col">
                  <label className="fw-medium">First Name
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
                <div className="form-group m-2 col">
                  <label className="fw-medium">Last Name
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

              <div className="row">
                <div className="form-group m-2 mt-0 col">
                  <label className="fw-medium">
                    Address
                  </label>
                  <Field
                    type="text"
                    className="form-control inputs border-1 border-info"
                    id="addressInput"
                    placeholder="Enter address"
                    name="address"
                  ></Field>
                  {errors.address && touched.address ? (
                    <div className="text-danger">{errors.address}</div>
                  ) : null}
                </div>
                <div className="form-group m-2 mt-0 col">
                  <label className="fw-medium">Email
                  </label>
                  <Field
                    type="text"
                    className="form-control inputs border-1 border-info"
                    name="email"
                    id="emailInput"
                    placeholder="Enter email"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-danger">{errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="form-group m-2 mt-0 col">
                  <label className="fw-medium">Mobile Number
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
                <div className="form-group m-2 mt-0 col">
                  <label className="fw-medium">Manager
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
              </div>

              <div className="row">
                <div className="col m-2 mt-0 form-group">
                  <label className="fw-medium">Role
                  </label>
                  <Field
                    as="select"
                    id="select-role"
                    className="form-select  inputs border-1 border-info"
                    name="role"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => {
                      if (role.roleId !== 1 && role.roleId !== 4) {
                        return (
                          <option value={role.roleId}>{role.roleName}</option>
                        );
                      }
                      return null;
                    })}
                  </Field>
                  {errors.role && touched.role ? (
                    <div className="text-danger">{errors.role}</div>
                  ) : null}
                </div>
                <div className="col m-2 mt-0 form-group">
                  <label className="fw-medium">Department
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

              <div className="row">
                <div className="form-group m-2 mt-0 col">
                  <label className=" fw-medium  ms-0">Password</label>
                  <div className="position-relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      className="form-control inputs border-1 border-secondary"
                      name="password"
                      id="passwordInput"
                      placeholder="Enter password"
                    />
                    <i
                      className="bi bi-eye-slash position-absolute end-0 top-50 translate-middle-y ms-3 me-2"
                      id="togglePassword"
                      onClick={() => handleShowPassword()}
                    ></i>
                  </div>

                  {errors.password && touched.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group m-2 mt-0 col">
                  <label className="fw-medium ms-0">Confirm Password</label>

                  <div className="position-relative">
                    <Field
                      type={showPassword1 ? "text" : "password"}
                      className="form-control inputs border-1 border-secondary"
                      name="retypepassword"
                      id="retypepasswordInput"
                      placeholder="Enter password"
                    />
                    <i
                      className="bi bi-eye-slash position-absolute end-0 top-50 translate-middle-y ms-3 me-2"
                      id="togglePassword"
                      onClick={() => handleShowPassword1()}
                    ></i>
                  </div>

                  {errors.retypepassword && touched.retypepassword ? (
                    <div className="text-danger">{errors.retypepassword}</div>
                  ) : null}
                </div>
              </div>

              <div className="d-flex justify-content-center mb-1   m-4">
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
};

export default User;
