import React from 'react';
import styled from 'styled-components';
import hello from '../assets/robot.gif';
import Logout from './logout';

function Welcome({ currentUser }) {
  console.log(currentUser);
  return (
    <Container>
      <img src={hello} alt="" srcSet="" />
      {currentUser && (
        <>
          <h1>
            Welcome ,<span>{currentUser.username}</span>
          </h1>
          <h3>Select a chat to start texting :)</h3>
        </>
      )}
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: 20rem;
  }

  span {
    color: rgba(233, 14, 100);
  }
`;

export default Welcome;
