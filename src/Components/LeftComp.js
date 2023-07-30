import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';
import { PrimaryButton, SecondaryButton } from "./MyButton";
import "./MyButton.css";
import MyTable from './MyTable';
import { useSelector,useDispatch } from 'react-redux';
import { setSortBy, setSortOrder } from './actions'; 

function LeftComp({ pageName }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isVoteClicked, setIsVoteClicked] = useState(false); // Track if the "Vote" button is clicked
  const initialId = 37; // Set the initialId to 0
  const message = useSelector((state) => state.message);
  const sortColumn = useSelector((state) => state.sortBy[pageName]); // Use a specific pageName to access sorting settings
  const sortOrder = useSelector((state) => state.sortOrder[pageName]);

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

  const handleSort = (field) => {
    dispatch(setSortBy(pageName, field)); // Pass the pageName to setSortBy action
    dispatch(setSortOrder(pageName, sortOrder === 'asc' ? 'desc' : 'asc')); // Pass the pageName to setSortOrder action
  };

  return (
    <div style={{ padding: '25px', width: '1000px', height: '60px' }}>
      <div style={{ paddingLeft: '20px' }}>
        <h1>{Question}</h1>
        {!isVoteClicked && ( // Render the link to VoteComp only when isVoteClicked is false
          <Link to={`/vote/${id}`} style={{ textDecoration: 'none' }}>
            {/* <button style={{ height: '50px',backgroundColor:'skyblue',border:'whitesmoke' }} id="but" onClick={handleVoteClick}>
              Vote on this Poll
            </button> */}
            <PrimaryButton name="Vote on this Poll" size="large" className="vote-on-this-poll"/>
          </Link>
        )}
      </div>
      <div >
        <MyTable
          style={{width: '50%', padding: '5px', fontSize: '17px'}}
          columns={[
            { field: 'number', label: 'Number' },
            { field: 'option', label: 'Option' },
            { field: 'votes', label: 'Votes' },
          ]}
          data={Object.entries(OptionVote).map(([option, votes], index) => ({
            number: index + 1,
            option: option,
            votes: votes,
          }))}
          sortColumn={sortColumn} // Pass sortColumn as a prop to MyTable
          sortOrder={sortOrder} // Pass sortOrder as a prop to MyTable
          onSort={handleSort}
          pageName={pageName} // Pass a unique pageName prop to identify this table
        />
      </div>
      <p style={{ paddingLeft: '17px'}}>Tags: {Tags.join(', ')}</p>
      <p>{message}</p>
    </div>
  );
}

export default LeftComp;