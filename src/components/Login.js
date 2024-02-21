import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import { useUserContext } from '../UserContext';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase char.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase char.')
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      'Password must contain at least 1 number or special char (@, !, #, etc).'
    )
    .required('Password is required'),
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const {decodedToken,setDecodedToken} = useUserContext();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    //setErrors({ ...errors, email: '' });
   
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:26429/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        
        //console.log(dt);
        toast.success('LoggedIn successfully', {
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
          const result = await response.json();
        localStorage.setItem('token', result.token);
        const token = localStorage.getItem('token');
        //console.log(token);
        const dt = jwtDecode(token);
        setDecodedToken(dt);
          if(dt.role=="Admin"){
            console.log(decodedToken);
              navigate('/showusers');
          }else if(dt.role=="Employee"){
              navigate('/request');
          }if(dt.role=="Manager"){
            navigate('/viewallrequests')
          }if(dt.role=="HRTravelAdmin"){
            navigate('/viewallhrrequests')
          }
        }, 1500); 
        
      } else {
        console.error('Login failed');
        toast.error('Wrong Email or Password', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
        
      }
    } catch (error) {
      console.error('Error during login:', error);
     
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      // If validation passes, continue with login logic
      handleLogin();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // If validation fails, update the errors state with the validation errors
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className='bg-info' id='loginForMainDiv'>
      
        <div className="background-image bg-info ">
        
      <Container className='d-flex justify-content-center align-items-center  '>
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
        <Row id="loginform">
          <Col  className="form-container">
            <div className="form-header"> Login </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={!!errors.email}
                  autoComplete='off'
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={!!errors.password}
                  autoComplete='off'
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
                <div className='d-flex justify-content-center mt-4 mb-2'>
                    <Button className="custom-button" type="submit">
                    Login
                </Button>
                </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
    
  );
};

export default Login;