import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyButton.css';
import { PrimaryButton, SecondaryButton } from "./MyButton";
import { Alert } from '@mui/material';

function VoteComp({ id }) {
  const radioStyle = {
    margin: '20px',
  };
  const btnStyle = {
    width: '50px',
    marginTop: '10px',
  };
  const labelStyle = {
    marginBottom: '10px',
  };

  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/polls/get_poll_details/${id}/`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoteClick = async () => {
    if (!selectedOption) {
      // Check if an option is selected
      setErrorMessage('Please select an option.'); // Set the error message
      return;
    }

    try {
      await fetch(`http://127.0.0.1:8000/polls/update_poll/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          incrementOption: selectedOption.option, // Pass the selected option value
        }),
      });

      setShowSuccessMessage(true);
      // Navigate to the PollsDetail page with the question ID
      setTimeout(() => {
        navigate(`/polldetail/${id}`); 
        setShowSuccessMessage(false); 
      }, 1000); 
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred.'); 
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value));
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  const { Question, OptionVote } = question;

  return (
    <div style={radioStyle}>
      <h1>{Question}</h1>
      <div id="new">
        {Object.entries(OptionVote).map(([option, votes], index) => (
          <label key={index}>
            <input
              type="radio"
              name="voteOption"
              value={JSON.stringify({ option, votes })}
              checked={selectedOption && selectedOption.option === option}
              onChange={handleOptionChange}
            />
            {option}
            <br />
          </label>
        ))}
        <br />
        {errorMessage && <Alert severity="error" style={{ width: '300px' }}>{errorMessage}</Alert>} {/* Display the error message */}
        {showSuccessMessage && <Alert severity="success" style={{ width: '300px' }}>Voted successfully!</Alert>}
        <br />
        <SecondaryButton name="Vote" size="small" className="vote" onClick={handleVoteClick} />
      </div>
    </div>
  );
}

export default VoteComp;