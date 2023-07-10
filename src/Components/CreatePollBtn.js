import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePollBtn() {
  const navigate = useNavigate();

  let createBtn = {
    height: '50px',
    width: '210px',
    margin: '10px',
    backgroundColor: 'skyblue',
    border: 'whitesmoke',
    color: 'black',
  };

  const handleCreatePollClick = () => {
    navigate('/createpoll');
  };

  return (
    <div style={{paddingTop:'11px'}}>
      <button style={createBtn} onClick={handleCreatePollClick}>
        Create Poll
      </button>
    </div>
  );
}
