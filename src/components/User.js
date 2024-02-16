import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function AddUser(user,navigate) {
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
  navigate('/showusers')
  console.log(result);
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
  mobilenumber: Yup.string().required("Required")
  .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/,"Enter valid Mobile Number"),
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
      <div className="w-50 p-4 bg-success-subtle m-4 rounded-4" id="formdiv">
        <h1 className="text-center" id="adduserheading">
          Add User
        </h1>
        <hr className="section-break-3" />
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
            AddUser(values,navigate);
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
              <div className="form-group m-2">
                <label>
                  <h6>Email</h6>
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
              <div className="form-group m-2">
                <label>
                  <h6>Password</h6>
                </label>

                <div className="d-flex align-items-center">
                  <Field
                    type={showPassword ? "text" : "password"}
                    className="form-control inputs border-1 border-info "
                    name="password"
                    id="  passwordInput"
                    placeholder="Enter password"
                  />
                  <i
                    className="bi bi-eye-slash ms-3 me-2"
                    id="togglePassword"
                    onClick={() => handleShowPassword()}
                  ></i>
                </div>

                {errors.password && touched.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>
              <div className="form-group m-2">
                <label>
                  <h6>Retype Password</h6>
                </label>
                <div className="d-flex align-items-center">
                  <Field
                    type={showPassword1 ? "text" : "password"}
                    className="form-control inputs border-1 border-info "
                    name="retypepassword"
                    id="retypepasswordInput"
                    placeholder="Enter password"
                  />
                  <i
                    className="bi bi-eye-slash ms-3 me-2"
                    onClick={() => handleShowPassword1()}
                    id="togglePassword"
                  ></i>
                </div>

                {errors.retypepassword && touched.retypepassword ? (
                  <div className="text-danger">{errors.retypepassword}</div>
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
};

export default User;
