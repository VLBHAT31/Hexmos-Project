import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      return;
    }

    // Perform the necessary logic for voting
    // ...
    await fetch(`http://127.0.0.1:8000/polls/update_poll/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incrementOption: selectedOption.option, // Pass the selected option value
      }),
    });

    // Navigate to the PollsDetail page with the question ID
    navigate(`/polldetail/${id}`); // Replace ":id" with the actual ID of the poll
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
        <button style={{width: '50px',marginTop: '10px',backgroundColor:'skyblue',border:'whitesmoke'}} id="vote" onClick={handleVoteClick} disabled={!selectedOption}>
          Vote
        </button>
      </div>
    </div>
  );
}

export default VoteComp;
