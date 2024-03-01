import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LoginRoute } from '../utils/ApiRoutes';
import { Link, useNavigate } from 'react-router-dom';

const toastOptions = {
  position: 'top-right',
  draggable: true,
  autoClose: 8000,
  pauseOnHover: true,
  theme: 'colored',
};
 
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  useEffect(()=>{
    
    if(localStorage.getItem('chat-app-user'))
      navigate("/");
  });

 const handleSubmit = async (event) => {
  event.preventDefault();
  if (!handleValidation()) return;

  try {
    const { data } = await axios.post(LoginRoute, values, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(data); // Corrected typo here

    if (data.status === false) {
      const errorMessage = data.error || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage, toastOptions);
    } else {
      localStorage.setItem('chat-app-user', JSON.stringify(data.data));
      navigate('/');
    }
  } catch (error) {
    console.error('Login error:', error.response);
    const errorMessage = error.response?.data.error || 'Login failed. Please try again.';
    setError(errorMessage);
    toast.error(errorMessage, toastOptions);
  }
};
  const handleValidation = () => {
    const { username, password } = values;

    if (password === '') {
      toast.error('Password not given', toastOptions);
      return false;
    }
    if (username === '') {
      toast.error('Username is required', toastOptions);
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
        <form onSubmit={handleSubmit}>
        <div className="box-container">
  <img src={logo} alt="" />
  <div>
    <h1>ChatGo</h1>
    <h3>Login</h3>
  </div>
</div>
          <input
            type="text"
            placeholder="Enter your name"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <button className="submit" type="submit">
            LOG IN
          </button>
          <br />
          <div>
            <span>Don't have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
      {error && <ErrorContainer>Error: {error}</ErrorContainer>}
    </>
  );
};

const FormContainer = styled.div`
  width: 100vw;
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
    padding: 3rem 5rem;
    box-shadow: 9px -7px 19px 2px rgb(0 1 10 / 50%);
    background-color: rgba(224, 67, 148, 0.50);
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
  .submit {
    padding: 0.8rem;
    background-color: #fce1ee;
    color: black;
    border-radius: 0.5rem;
    font-size: medium;
    outline: none;
    text-transform: uppercase;
  }
  .submit:hover {
    background-color: #faafe2;
    color: black;
    border-radius: 0.5rem;
    font-weight: bold;
    outline: none;
  }
  span {
    font-weight: bold;
  }
  a {
    font-weight: 500;
    padding: 0.2rem;
  }
  a:hover {
    font-weight: 900;
  }
  p {
    display: flex;
    flex-direction: column;
  }
  h3 {
    padding: 0.8rem;
  }
`;

const ErrorContainer = styled.div`
  color: red;
  margin-top: 10px;
`;

export default Login;
