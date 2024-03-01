import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../utils/ApiRoutes';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/';
  const navigate = useNavigate();

  const toastOptions = useMemo(() => ({
    position: 'top-right',
    draggable: true,
    autoClose: 8000,
    pauseOnHover: true,
    theme: 'colored',
  }), []);

  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select a profile picture", toastOptions);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        const response = await axios.post(`${setAvatarRoute}/${user._id}`, { image: avatars[selectedAvatar] });
  
        if (response && response.data && response.data.isSet) {
          user.isAvatar = true;
          user.avatar = response.data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate('/');
        } else {
          toast.error("Error setting avatar: Response data is invalid", toastOptions);
        }
      } catch (error) {
        console.error('Error setting avatar:', error);
        toast.error('Failed to set avatar. Please try again.', toastOptions);
      }
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          await new Promise(resolve => setTimeout(resolve, 10));

          // Fetch the avatar image directly
          const imageUrl = `${api}${Math.round(Math.random() * 1000)}.png`;
          data.push(imageUrl);
        }
        setAvatars(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching avatars:', error);
        toast.error('Failed to fetch avatars. Please try again.', toastOptions);
      }
    };
  
    fetchData();
  }, [api, toastOptions]);

  return (
    <>
      {loading ? (
        <Container>
          <img src={loader} alt="Loading..." />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} onClick={() => setSelectedAvatar(index)}>
                <img src={avatar} alt={`Avatar ${index + 1}`} />
              </div>
            ))}
          </div>
          <div>
            <button type="button" className="submit" onClick={setProfilePic}>Set As Profile Pic</button>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #fce1ee;
  height: 100vh;
  width: 100vw;

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      
      &.selected {
        border: 0.4rem solid #e04394;
        border-radius: 5rem;
      }
    }
  }

  img {
    height: 6rem;
  }
  img:hover{
    transform:scale(1.1);
  }

  .submit {
    padding: 0.8rem;
    background-color: #fce1ee;
    color: black;
    border-radius: 0.5rem;
    font-size: medium;
    outline: none;
    text-transform: uppercase;
    cursor: pointer;
  }

  .submit:hover {
    background-color: #faafe2;
    color: black;
    border-radius: 0.5rem;
    font-weight: bold;
  }
`;

export default SetAvatar;
