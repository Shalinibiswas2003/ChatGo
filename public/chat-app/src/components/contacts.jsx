import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
function Contacts({ contacts, currentUser, changeChat }) {
  const navigate = useNavigate();
  const [currUsername, setCurrUsername] = useState(undefined);
  const [currUserImg, setCurrUserImg] = useState(undefined);
  const [currSelected, setCurrSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrUserImg(currentUser.avatar);
      setCurrUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currUsername && currUserImg && (
        <Container>
          <div className="box-container">
            <img src={logo} alt="logo" />
            <h3>ChatGo</h3>
          </div>
          {contacts && contacts.length > 0 && (
            <div className="contacts">
              {contacts.map((contact, index) => (
                <div
                  className={`contact ${index === currSelected ? 'selected' : ''}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={contact.avatar} alt={`Avatar ${index + 1}`} />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="current-user">
            <div className="avatar" onClick={() => navigate('/setAvatar')}>
              <img src={currUserImg} alt="Current User Avatar" />
              <span className="tooltip">Update profile pic</span>
            </div>
            <div className="username">
              <h2>{currUsername}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

Contacts.defaultProps = {
  contacts: [],
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: rgba(224, 67, 148, 0.50);
  gap: 0.3rem;

  .box-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 3rem;
    }

    h3 {
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.9rem;

    &::-webkit-scrollbar {
      width: 0.4rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.2rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.6rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }
    }

    .selected {
      background-color: rgba(233, 14, 127, 0.5);
      transform: scale(1.1);
    }
  }

  .current-user {
    background-color: rgba(233, 14, 127, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      position: relative;

      img {
        height: 3.5rem;
        max-inline-size: 100%;
        transition: transform 0.3s ease;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }

      .tooltip {
        position: absolute;
        bottom: 3.5rem;
        left: 100%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 0.5rem;
        border-radius: 0.3rem;
        font-size: 0.8rem;
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
          cursor: pointer;
        }
      }

      &:hover .tooltip {
        opacity: 1;
      }
    }

    .username {
    }
  }
`;

export default Contacts;
