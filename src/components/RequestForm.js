import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./TravelRequestForm.css";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


async function GetAllLocations(setLocations) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/getalllocations"
  );
  setLocations(response.data);
  return response.data;
}

async function GetAllProjects(setProjects) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/getallprojects"
  );
  setProjects(response.data);
  return response.data;
}

async function GetAllBookingTypes(setBookingTypes) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/getallbookingtypes"
  );
  setBookingTypes(response.data);
  return response.data;
}

async function GetAllFlightTypes(setFlightTypes) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/getallflighttypes"
  );
  setFlightTypes(response.data);
  return response.data;
}

async function GetAllMealTypes(setMealTypes) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/getallmealtypes"
  );
  setMealTypes(response.data);
  return response.data;
}

async function GetAllMealPreferences(setMealPreferences) {
  const response = await axios.get(
    "http://localhost:26429/api/travelrequest/getallmealpreferences"
  );
  setMealPreferences(response.data);
  return response.data;
}

async function GetManagers(setManagers) {
  const response = await axios.get("http://localhost:26429/api/user/manager");
  setManagers(response.data);
  return response.data;
}

async function GetDepartmentById(id) {
  const response = await axios.get(
    "http://localhost:26429/api/department/" + id
  );
  console.log("Get department by ");
  console.log(response.data);
  return response.data;
}
async function GetDepartments(setDepartments) {
  const response = await axios.get("http://localhost:26429/api/department");
  setDepartments(response.data);
  return response.data;
}

async function AddToRequest(requestValues , navigate) {
  debugger;
  var commonValues = {
    userId: parseInt(requestValues.employeeId),
    reasonForTravelling: requestValues.reasonForTravelling,
    bookingTypeId: parseInt(requestValues.bookingTypeId),
    projectId: parseInt(requestValues.projectId),
    managerId: parseInt(requestValues.managerId),
    departmentId: parseInt(requestValues.departmentId),
    createdBy: parseInt(requestValues.employeeId),
    aadharNo: requestValues.aadharNo,
  };
  if (requestValues.bookingTypeId == "1") {
    var temp = {
      ...commonValues,
      flightTypeId: parseInt(requestValues.flightTypeId),
      to: parseInt(requestValues.toLocationId),
      from: parseInt(requestValues.fromLocationId),
      passportNo: requestValues.passportNo,
      flightDate: requestValues.flightDate,
      createdBy: parseInt(requestValues.employeeId),
    };
  }

  if (requestValues.bookingTypeId == "2") {
    var temp = {
      ...commonValues,
      numberOfDays: requestValues.numberOfDays,
      stayDate: requestValues.hotelDate,
      mealTypeId: parseInt(requestValues.mealTypeId),
      hotelLocationId: parseInt(requestValues.hotelLocationId),
      mealPreferenceId: parseInt(requestValues.mealPreferenceId),
      createdBy: parseInt(requestValues.employeeId),
    };
  }

  if (requestValues.bookingTypeId == "3") {
    var temp = {
      ...commonValues,
      to: parseInt(requestValues.toLocationId),
      from: parseInt(requestValues.fromLocationId),
      passportNo: requestValues.passportNo,
      flightDate: requestValues.flightDate,
      numberOfDays: requestValues.numberOfDays,
      stayDate: requestValues.hotelDate,
      flightTypeId: parseInt(requestValues.flightTypeId1),
      mealTypeId: parseInt(requestValues.mealTypeId),
      hotelLocationId: parseInt(requestValues.hotelLocationId),
      mealPreferenceId: parseInt(requestValues.mealPreferenceId),
      createdBy: parseInt(requestValues.employeeId),
    };
  }

  const result = await axios.post(
    "http://localhost:26429/api/travelrequest/addtorequest",
    JSON.stringify(temp),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (result.status == 200) {
    toast.success('Request added successfully', {
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
        navigate('/requesthistory');
      }, 1500); 
    console.log("Request Added Successfully");

  }
}

// async function UploadFiles(requestValues) {
//   debugger;
//   const formData = new FormData();
//   alert(requestValues.aadharCardFile);
//     formData.append("aadharCardFile",requestValues.aadharCardFile);
//     console.log(requestValues.aadharCardFile);
//     alert(requestValues.passportFile);
//     if(requestValues.passportFile!=null){
//       formData.append("passportFile",requestValues.passportFile);
//     }
//     alert(requestValues.passportFile);
//     if(requestValues.visaFile!=null){
//       formData.append("visaFile",requestValues.visaFile);
//     }
//   console.log(formData);
//   const result = await axios.post("http://localhost:26429/api/travelrequest/upload",  {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     }
//     ,
//     data : formData
//   });
//   if(result.status == 200){
//     console.log("Request Added Successfully");
//   }

// }

async function UploadFiles(requestValues) {
  debugger;
  const formData = new FormData();
  console.log(typeof requestValues.aadharCardFile);
  formData.append("aadharCardFile", requestValues.aadharCardFile);
  console.log(requestValues.aadharCardFile);

  if (requestValues.passportFile != null) {
    formData.append("passportFile", requestValues.passportFile);
  }

  if (requestValues.visaFile != null) {
    formData.append("visaFile", requestValues.visaFile);
  }

  console.log(formData);

  try {
    const response = await fetch(
      "http://localhost:26429/api/travelrequest/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      console.log("Request Added Successfully");
    } else {
      console.error("Error uploading files:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error.message);
  }
}

function RequestForm() {
  const { decodedToken, setDecodedToken } = useUserContext();
  const [locations, setLocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [bookingTypes, setBookingTypes] = useState([]);
  const [flightTypes, setFlightTypes] = useState([]);
  const [mealtypes, setMealTypes] = useState([]);
  const [mealPreferences, setMealPreferences] = useState([]);
  const [managers, setManagers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // Fetch data here
      GetAllLocations(setLocations);
      GetAllProjects(setProjects);
      GetAllBookingTypes(setBookingTypes);
      GetAllFlightTypes(setFlightTypes);
      GetAllMealPreferences(setMealPreferences);
      GetAllMealTypes(setMealTypes);
      GetManagers(setManagers);
      GetDepartments(setDepartments);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  //console.log(locations);

  const validationSchema = Yup.object().shape({
    reasonForTravelling: Yup.string().required("Reason is required"),
    bookingTypeId: Yup.string().required("Select booking Type"),
    projectId: Yup.string().required("Select Project"),
    managerId: Yup.string().required("Select Manager"),
  });

  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [visaFile, setVisaFile] = useState(null);

  const handleAadharCardFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setAadharCardFile(selectedFile);
  };

  const handlePassportFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPassportFile(selectedFile);
  };

  const handleVisaFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setVisaFile(selectedFile);
  };

  if (
    locations != null &&
    decodedToken != null &&
    decodedToken.firstName != null &&
    decodedToken.lastName != null &&
    decodedToken.userId != null &&
    decodedToken.departmentId != null
  ) {
    return (
      <div className="container my-3 p-2 rounded-4" id="requestformdivmaindiv">
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
          draggable
          pauseOnHover
        theme="light"
/>
        <div className="ms-4 mt-3">
          <h1>Request for Travel</h1>
        </div>
        <hr />
        <Formik
          initialValues={{
            employeeId: decodedToken.userId,
            employeeName: decodedToken.firstName + " " + decodedToken.lastName,
            projectId: "",
            departmentId: parseInt(decodedToken.departmentId),
            reasonForTravelling: "",
            bookingTypeId: "",
            toLocationId: null,
            fromLocationId: null,
            flightTypeId: null,
            flightTypeId1: null,
            aadharNo: "",
            flightDate: null,
            passportNo: null,
            hotelDate: null,
            numberOfDays: null,
            mealTypeId: null,
            mealPreferenceId: null,
            hotellocationId: null,
          }}
          onSubmit={(values) => {
            debugger;
            AddToRequest(values, navigate);

            const formData = new FormData();
            console.log(typeof aadharCardFile);
            formData.append("aadharCardFile", aadharCardFile);

            if (passportFile != null) {
              formData.append("passportFile", passportFile);
            }

            if (visaFile != null) {
              formData.append("visaFile", visaFile);
            }
            // formData.append(
            //   "emplyeeName",
            //   decodedToken.firstName + "_" + decodedToken.lastName
            // );
            // formData.append("userId", 3);

            console.log(formData);

            try {
              const result = axios.post(
                "http://localhost:26429/api/travelrequest/upload",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
            } catch (error) {
              console.error("Network error:", error.message);
            }
          }}
          validationSchema={validationSchema}
        >
          {({ values,errors, touched }) => (
            <div
              className="p-2 m-3 overflow-y-auto overflow-x-hidden"
              id="requestformdiv"
            >
              <Form className={styles.Form}>
                <div className="row">
                  <div className="col-md">
                    <label className="mt-1">Employee ID :</label>
                    <Field
                      type="number"
                      name="employeeId"
                      className="form-control ms-0 m-1"
                      disabled
                    />
                  </div>
                  <div className="col-md ">
                    <label className="mt-1">Employee Name :</label>
                    <Field
                      type="text"
                      name="employeeName"
                      className="form-control ms-0 m-1"
                      disabled
                    />
                  </div>
                  <div className="col-md">
                    <label className="mt-1">Project Name :</label>
                    <Field
                      as="select"
                      name="projectId"
                      className="form-select ms-0 m-1"
                    >
                      <option value="">Select Project</option>
                      {projects.map((project) => (
                        <option value={project.projectId}>
                          {project.projectName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="projectId"
                      component="div"
                      className={`${styles.error}`}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md">
                    <label className="mt-1">Department Name :</label>
                    <Field
                      as="select"
                      name="departmentId"
                      className="form-select ms-0 m-1"
                      disabled
                    >
                      <option value="">Select option</option>
                      {departments.map((department) => (
                        <option value={department.departmentId}>
                          {department.departmentName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="departmentId"
                      component="div"
                      className={`${styles.error}`}
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="col-md">
                    <label className="mt-1">Reason for Travelling :</label>
                    <Field
                      type="text"
                      name="reasonForTravelling"
                      className="form-control ms-0 m-1"
                    />
                    <ErrorMessage
                      name="reasonForTravelling"
                      component="div"
                      className={`${styles.error}`}
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="col-md">
                    <label className="mt-1">Manager :</label>
                    <Field
                      as="select"
                      name="managerId"
                      className="form-select ms-0 m-1"
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option value={manager.userId}>
                          {manager.userId}-{manager.firstName}{" "}
                          {manager.lastName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="managerId"
                      component="div"
                      className={`${styles.error}`}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <label className="mt-1">Type of Booking :</label>
                    <Field
                      as="select"
                      name="bookingTypeId"
                      className="form-select ms-0 m-1"
                    >
                      <option value="">Select BookingType</option>
                      {bookingTypes.map((bookingType) => (
                        <option value={bookingType.bookingTypeId}>
                          {bookingType.bookingTypeName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="bookingTypeId"
                      component="div"
                      className={`${styles.error}`}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                {/* airTicket only */}

                {values.bookingTypeId === "1" && (
                  <div>
                    <div className="row">
                      <div className="col-md">
                        <label htmlFor="">Select Flight Type</label>
                        <Field
                          as="select"
                          name="flightTypeId"
                          className="form-select"
                        >
                          <ErrorMessage
                            name="flightTypeId"
                            component="div"
                            className={`${styles.error}`}
                          />
                          <option value="">Select here..</option>
                          {flightTypes.map((flightType) => (
                            <option value={flightType.flightTypeId}>
                              {flightType.flightTypeName} Flight
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-md">
                        <label className="">To : </label>
                        <Field
                          as="select"
                          name="toLocationId"
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option value={location.locationId}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-md">
                        <label className="">From : </label>
                        <Field
                          as="select"
                          name="fromLocationId"
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option value={location.locationId}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    {values.flightTypeId === "1" && (
                      <div className="row">
                        <div className="col-md">
                          <label>Aadhar Card</label>
                          <input
                            type="file"
                            name="aadharCardFile"
                            className="form-control"
                            onChange={handleAadharCardFileChange}
                          />
                        </div>
                        <div className="col-md">
                          <label htmlFor="">Aadhar No.</label>
                          <Field
                            type="text"
                            name="aadharNo"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md">
                          <label htmlFor="">Date</label>
                          <Field
                            type="date"
                            name="flightDate"
                            className="form-control"
                          />
                        </div>
                      </div>
                    )}

                    {values.flightTypeId === "2" && (
                      <>
                        <div className="row">
                          <div className="col-md">
                            <label htmlFor="">Passport No.</label>
                            <Field
                              type="text"
                              name="passportNo"
                              className="form-control "
                            />
                            {errors.passportNo && touched.passportNo ? (
                    <div className="text-danger">{errors.passportNo}</div>
                  ) : null}
                          </div>
                          <div className="col-md">
                            <label>Upload PassPort</label>
                            <input
                              type="file"
                              name="passportFile"
                              className="form-control"
                              onChange={handlePassportFileChange}
                            />
                          </div>
                          <div className="col-md">
                            <label>Upload Visa</label>
                            <input
                              type="file"
                              name="visaFile"
                              className="form-control"
                              onChange={handleVisaFileChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md">
                            <label htmlFor="">Date</label>
                            <Field
                              type="date"
                              name="flightDate"
                              className="form-control"
                            />
                          </div>
                          <div className="col-md">
                            <label>Aadhar Card</label>
                            <input
                              type="file"
                              name="aadharCardFile"
                              className="form-control"
                              onChange={handleAadharCardFileChange}
                            />
                          </div>
                          <div className="col-md">
                            <label htmlFor="">Aadhar No.</label>
                            <Field
                              type="text"
                              name="aadharNo"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Hotel only */}

                {values.bookingTypeId === "2" && (
                  <>
                    <div className="row">
                      <div className="col-md">
                        <label htmlFor="">Date</label>
                        <Field
                          type="date"
                          name="hotelDate"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md">
                        <label>Aadhar Card</label>
                        <input
                          type="file"
                          name="aadharCardFile"
                          className="form-control"
                          onChange={handleAadharCardFileChange}
                        />
                      </div>
                      <div className="col-md">
                        <label>Aadhar Number</label>
                        <Field
                          type="text"
                          name="aadharNo"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md">
                        <label>Number of Days</label>
                        <Field
                          type="number"
                          name="numberOfDays"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md">
                        <label htmlFor="">Meal Required</label>
                        <Field
                          as="select"
                          name="mealTypeId"
                          className="form-select"
                        >
                          <option value="">Select here..</option>
                          {mealtypes.map((mealtype) => (
                            <option value={mealtype.mealTypeId}>
                              {mealtype.mealName}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div className="col-md">
                        <label htmlFor="">Meal Preferences</label>
                        <Field
                          as="select"
                          name="mealPreferenceId"
                          className="form-select"
                        >
                          <option value="">Select here..</option>
                          {mealPreferences.map((mealPreference) => (
                            <option value={mealPreference.mealPreferenceId}>
                              {mealPreference.mealPreferenceName}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <label htmlFor="">Location</label>
                        <Field
                          as="select"
                          name="hotelLocationId"
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option value={location.locationId}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </>
                )}

                {/* airTicket and hotel both */}

                {values.bookingTypeId === "3" && (
                  <div>
                    <div className="row">
                      <div className="col-md">
                        <label htmlFor=""> Hotel Date</label>
                        <Field
                          type="date"
                          name="hotelDate"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md">
                        <label>Number of Days</label>
                        <Field
                          type="number"
                          name="numberOfDays"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md">
                        <label>Select Flight Type</label>
                        <Field
                          as="select"
                          name="flightTypeId1"
                          className="form-select"
                        >
                          <option value="">Select here..</option>
                          {flightTypes.map((flightType) => (
                            <option value={flightType.flightTypeId}>
                              {flightType.flightTypeName} Flight
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    {values.flightTypeId1 === "1" && (
                      <div className="row">
                        <div className="col-md">
                          <label>Aadhar Card</label>
                          <input
                            type="file"
                            name="aadharCardFile"
                            className="form-control"
                            onChange={handleAadharCardFileChange}
                          />
                        </div>
                        <div className="col-md">
                          <label htmlFor="">Aadhaar No.</label>
                          <Field
                            type="text"
                            name="aadharNo"
                            className="form-control "
                          />
                        </div>
                        <div className="col-md">
                          <label htmlFor="">Flight Date</label>
                          <Field
                            type="date"
                            name="flightDate"
                            className="form-control"
                          />
                        </div>
                      </div>
                    )}

                    {values.flightTypeId1 === "2" && (
                      <>
                        <div className="row">
                          <div className="col-md">
                            <label htmlFor="">Passport No.</label>
                            <Field
                              type="text"
                              name="passportNo"
                              className="form-control "
                            />
                          </div>
                          <div className="col-md">
                            <label>Upload PassPort</label>
                            <input
                              type="file"
                              name="passportFile"
                              className="form-control"
                              onChange={handlePassportFileChange}
                            />
                          </div>
                          <div className="col-md">
                            <label>Upload Visa</label>
                            <input
                              type="file"
                              name="visaFile"
                              className="form-control"
                              onChange={handleVisaFileChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md">
                            <label htmlFor=""> Flight Date</label>
                            <Field
                              type="date"
                              name="flightDate"
                              className="form-control"
                            />
                          </div>
                          <div className="col-md">
                            <label htmlFor="">Aadhaar No.</label>
                            <Field
                              type="text"
                              name="aadharNo"
                              className="form-control "
                            />
                          </div>
                          <div className="col-md">
                            <label>Aadahar Card</label>
                            <Field
                              type="file"
                              name="aadharCardFile"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row">
                      <div className="col-md">
                        <label htmlFor="">Meal Required</label>
                        <Field
                          as="select"
                          name="mealTypeId"
                          className="form-select"
                        >
                          <option value="">Select here..</option>
                          {mealtypes.map((mealtype) => (
                            <option value={mealtype.mealTypeId}>
                              {mealtype.mealName}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-md">
                        <label htmlFor="">Meal Preferences</label>
                        <Field
                          as="select"
                          name="mealPreferenceId"
                          className="form-select"
                        >
                          <option value="">Select here..</option>
                          {mealPreferences.map((mealPreference) => (
                            <option value={mealPreference.mealPreferenceId}>
                              {mealPreference.mealPreferenceName}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-md">
                        <label htmlFor="">Hotel Location</label>
                        <Field
                          as="select"
                          name="hotelLocationId"
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option value={location.locationId}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4-md col-4">
                        <label htmlFor="">From :</label>
                        <Field
                          as="select"
                          name="fromLocationId"
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option value={location.locationId}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-4-md col-4">
                        <label htmlFor="">To :</label>
                        <Field
                          as="select"
                          name="toLocationId"
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option value={location.locationId}>
                              {location.city}, {location.country}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                )}

                <br />
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default RequestForm;
