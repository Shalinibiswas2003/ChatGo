import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute, host } from '../utils/ApiRoutes';
import Contacts from '../components/contacts'; // Assuming correct import path
import Welcome from '../components/Welcome'; // Assuming correct import path
import ChatContainer from '../components/ChatContainer'; // Assuming correct import path
import { io } from "socket.io-client";

function Chat() {
  const Socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        setLoaded(true);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      Socket.current = io(host);
      Socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }
    };

    fetchContacts();
  }, [currentUser]);

  const handleChat = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChat} />
        {loaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer  currChat={currentChat} currUser={currentUser} socket={Socket}/>
        )}
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fce1ee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(224, 67, 148, 0.50);
    display: grid;
    grid-template-columns: 25% 75%;
  }

  @media only screen and (max-width: 768px) {
    .container {
      width: 95vw;
      grid-template-columns: 100%;
    }
  }
`;

export default Chat;
