import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';

function LeftComp() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isVoteClicked, setIsVoteClicked] = useState(false); // Track if the "Vote" button is clicked
  const initialId = 37; // Set the initialId to 0

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/polls/get_poll_details/${id || initialId}/`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoteClick = async () => {
    try {
      // Fetch the poll details again
      await fetchData();

      // Update the vote using the API
      await fetch(`http://127.0.0.1:8000/polls/update_poll/${id || initialId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Add any necessary headers
        },
        body: JSON.stringify({
          // Add any necessary body parameters
        })
      });

      // Set isVoteClicked to true
      setIsVoteClicked(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  const { Question, OptionVote, Tags } = question;

  return (
    <div style={{ padding: '25px', width: '1000px', height: '90px' }}>
      <div style={{ paddingLeft: '20px' }}>
      <h1>{Question}</h1>
      {!isVoteClicked && ( // Render the link to VoteComp only when isVoteClicked is false
        <Link to={`/vote/${id}`} style={{ textDecoration: 'none' }}>
          <button style={{ height: '50px',backgroundColor:'skyblue',border:'whitesmoke' }} id="but" onClick={handleVoteClick}>
            Vote on this Poll
          </button>
        </Link>
      )}
      </div>
      <div >
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Option</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody style={{width: '100px', padding: '5px', fontSize: '17px'}} >
            {Object.entries(OptionVote).map(([option, votes], index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{option}</td>
                <td>{votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ paddingLeft: '17px' }}>Tags: {Tags.join(', ')}</p>
    </div>
  );
}

export default LeftComp;
