import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { addMessageRoute, getAllMessageRoute } from '../utils/ApiRoutes';
import ChatInput from './chatInput'; // Assuming correct import path
import Logout from './logout'; // Assuming correct import path

function ChatContainer({ currChat, currUser, socket }) {
  const [msg, setMsg] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currUser && currChat) {
        try {
          const response = await axios.post(getAllMessageRoute, {
            from: currUser._id,
            to: currChat._id
          });
          setMsg(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [currChat, currUser]);

  const handleSendMsg = async (message) => {
    try {
      if (currUser && currChat) {
        await axios.post(addMessageRoute, {
          from: currUser._id,
          to: currChat._id,
          message: message
        });

        socket.current.emit("send-msg", {
          to: currChat._id,
          from: currUser._id,
          message: message
        });

        setMsg([...msg, { fromSelf: true, message: message }]);
        
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <>
      {currChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currChat.avatar} alt="Current User Avatar" />
              </div>
              <div className="username">
                <h3>{currChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {msg.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <div className={`message ${message.fromSelf ? "sent" : "received"}`}>
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem; /* Default height for avatar */
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%; /* Default max-width for message content */
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
      }
    }

    .sent {
      justify-content: flex-end;

      .content {
        background-color: rgba(233, 14, 127, 0.5);
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: #9900ff20;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .avatar img {
      height: 2rem; /* Decrease avatar height for smaller devices */
    }

    .content {
      max-width: 60%; /* Adjust max-width for message content on smaller devices */
    }
  }
`;

export default ChatContainer;
