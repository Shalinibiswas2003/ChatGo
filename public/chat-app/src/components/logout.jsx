
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import{BiPowerOff} from "react-icons/bi";

function Logout() {
    const navigate=useNavigate();
    const handleClick=async()=>{
        localStorage.clear();
        navigate('/login');

    }
  return (
    
    <Container>
      <BiPowerOff onClick={handleClick}/>
    </Container>
  )
}
const Container=styled.div`
display:flex;
align-items:center;
justify-content: flex-end;

padding:5px;
svg{
    cursor:pointer;
    font-size:1.5rem;
}
svg:hover{
    color:rgba(233, 1, 0.5);
    transform:scale(1.3);
}
`;
export default Logout
