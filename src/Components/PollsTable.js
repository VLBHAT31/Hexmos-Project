import React, { useContext } from 'react';
import { PollsContext } from './PollsContext';
import { Link } from 'react-router-dom';
import './style.css';

function PollsTable() {
  const { selectedTags, filteredPolls } = useContext(PollsContext);

  return (
    <div>
      <table style={{float:'right',position:'absolute',right:'30%',top:'16%',width:'50%'}}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Poll Question</th>
            <th>Total Votes</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredPolls.map((poll, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/polldetail/${poll.id+37}`}>{poll.Question}</Link>
              </td>
              <td>{Object.values(poll.OptionVote).reduce((a, b) => a + b, 0)}</td>
              <td>{poll.Tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PollsTable;