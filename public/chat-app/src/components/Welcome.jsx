import React from 'react';
import styled from 'styled-components';
import hello from '../assets/robot.gif';

function Welcome({ currentUser }) {
  return (
    <Container>
      <Image src={hello} alt="" />
      {currentUser && (
        <Content>
          <h1>
            Welcome, <span>{currentUser.username}</span>
          </h1>
          <h3>Select a chat to start texting :)</h3>
        </Content>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;

  @media screen and (min-width: 768px) {
    max-width: 400px;
  }
`;

const Content = styled.div`
  text-align: center;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1rem;
  }

  span {
    color: rgba(233, 14, 100);
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.2rem;
    }
  }
`;

export default Welcome;
