import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import logo from '../assets/logo.jpg';
import { registerRoute } from '../utils/ApiRoutes';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { data } = await axios.post(
          registerRoute,
          {
            email: values.email,
            password: values.password,
            username: values.username,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (data.status === false) {
          setError(data.error || 'Registration failed. Please try again.');
          toast.error(data.error || 'Registration failed. Please try again.', toastOptions);
        } else if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.data));
          navigate('/setAvatar');
        }
      } catch (error) {
        console.error('Registration error:', error);
  
        if (error.response) {
          const errorMessage = error.response.data.error || 'Registration failed. Please try again.';
          setError(errorMessage);
          toast.error(errorMessage, toastOptions);
        } else if (error.request) {
          setError('No response from the server. Please try again.');
          toast.error('No response from the server. Please try again.', toastOptions);
        } else {
          setError('An unexpected error occurred. Please try again.');
          toast.error('An unexpected error occurred. Please try again.', toastOptions);
        }
      }
    }
  };

  const toastOptions = {
    position: 'top-right',
    draggable: true,
    autoClose: 8000,
    pauseOnHover: true,
    theme: 'colored',
  };

  const handleValidation = () => {
    const { password, confirm_password } = values;

    if (password !== confirm_password) {
      toast.error('Password and Confirm Password do not match', toastOptions);
      return false;
    }

    if (password.length < 5) {
      toast.error('Password must be at least 5 characters', toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="box-container">
            <img src={logo} alt="ChatGo Logo" />
            <div>
              <h1>ChatGo</h1>
              <h3>Register</h3>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Enter a valid emailID"
            name="email"
            id="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirm_password"
            id="Confirmpassword"
            onChange={(event) => handleChange(event)}
          />

          <SubmitButton type="submit">Register</SubmitButton>
          <br />

          <div>
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
      {error && <ErrorContainer>Error: {error}</ErrorContainer>}
    </>
  );
}

const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fce1ee;
  gap: 1rem;

  .box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  img {
    height: 5rem;
  }

  h1 {
    color: black;
    text-transform: uppercase;
    position: relative;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 2rem;
    padding: 3rem;
    box-shadow: 9px -7px 19px 2px rgb(0 1 10 / 50%);
    background-color: rgba(224, 67, 148, 0.50);
    width: 100%;
    max-width: 400px;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.12rem solid black;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.15rem solid #e04394;
      outline: none;
    }
  }

  span {
    font-weight: bold;
  }

  a {
    font-weight: 500;
    padding: 0.2rem;
    cursor: pointer;
  }

  a:hover {
    font-weight: 900;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: #fce1ee;
  color: black;
  border-radius: 0.5rem;
  font-size: medium;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: #faafe2;
    color: black;
    border-radius: 0.5rem;
    font-weight: bold;
  }
`;

const ErrorContainer = styled.div`
  color: red;
  margin-top: 10px;
`;

export default Register;
