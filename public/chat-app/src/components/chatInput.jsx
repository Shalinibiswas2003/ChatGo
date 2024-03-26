import Picker from 'emoji-picker-react';
import emojiRegex from 'emoji-regex';
import React, { useEffect, useRef, useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

function ChatInput({ handleSendMsg }) {
  const emojiRegexPattern = emojiRegex();
  const inputRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setMsg(inputValue);
    console.log("Input value:", inputValue);
    console.log("Message state before setting:", msg);
  };

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

 /* const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const { selectionStart, selectionEnd } = inputRef.current;
    let newMsg;

    if (selectionStart !== selectionEnd) {
      // If there is a selection, replace it with the new emoji
      newMsg = msg.slice(0, selectionStart) + emoji + msg.slice(selectionEnd);
    } else if (msg.charAt(selectionStart - 1) === ' ') {
      // If the character before cursor is a space, insert emoji directly
      newMsg = msg.slice(0, selectionStart) + emoji + msg.slice(selectionStart);
    } else {
      // If there is no selection, insert the emoji at the cursor position
      newMsg = msg.slice(0, selectionStart) + emoji + msg.slice(selectionStart);
    }

    setMsg(newMsg);
  };
*/
const handleEmojiClick = (emojiObject) => {
  const emoji = emojiObject.emoji;
  const { selectionStart } = inputRef.current;
  
  setMsg(prevMsg => {
    const newMsg = prevMsg.slice(0, selectionStart) + emoji + prevMsg.slice(selectionStart);
    return newMsg;
  });
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendChat(e);
    } /*else if (e.key === 'Backspace') {
      const { selectionStart, selectionEnd } = inputRef.current;
      if (selectionStart === selectionEnd && selectionStart > 0) {
        // If there's no selection and cursor is not at the beginning
        const newMsg = msg.slice(0, selectionStart - 1) + msg.slice(selectionStart);
        setMsg(newMsg);
      }
    }*/
  };

  const sendChat = (event) => {
    event.preventDefault();
    const trimmedMsg = msg.trim();
    if (trimmedMsg.length > 0) {
      handleSendMsg(trimmedMsg);
      setMsg('');
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker className='emoji-picker-react' onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message here"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={msg}
          autoFocus
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding: 0.2rem;
  padding-bottom: 0.3rem;
  //margin-top: 48%;
  height: 80%;
  

  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left:0.6rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.4rem;
        color: yellow;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -400px;
        width: 250px;
        max-height: 400px;
        overflow-y: auto;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        z-index: 1;
      }
    }
  }

  .input-container {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    border-radius: 2rem;
    gap: 2rem;
    background-color: rgba(233, 14, 127, 0.5);

    input {
      flex: 1;
      height: 60%;
      background-color: transparent;
      border: none;
      color: black;
      padding-left: 2rem;

      &::selection {
        background-color: rgba(233, 1, 0.5);
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff34;
    }
    
  }
  @media screen and (max-width: 435px) {
    
     
    }
`;

export default ChatInput;