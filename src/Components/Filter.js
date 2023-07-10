import React, { useState, useEffect, useContext } from 'react';
import { PollsContext } from './PollsContext';

function Filter() {
  const { selectedTags, handleTagSelection, filterByTags, resetFilter } = useContext(PollsContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/polls/get_all_tags/')
      .then(response => response.json())
      .then(data => {
        setTags(data.Tags);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      handleTagSelection([...selectedTags, value]);
    } else {
      handleTagSelection(selectedTags.filter(tag => tag !== value));
    }
  };

  const handleFilterByTags = () => {
    filterByTags();
  };

  
  let checkStyle = {
    border: "1px solid black",
    width: "200px",
    paddingBottom: "30px",
    paddingLeft: "10px",
    margin: "10px",
    backgroundColor: "antiquewhite" 
  };

  let optionStyle = {
    marginTop: "30px",
    border: 'whitesmoke',
  };

  return (
    <div style={checkStyle}>
      {tags.map((tag, index) => (
        <React.Fragment key={index}>
          <label>
            <input
              type="checkbox"
              style={optionStyle}
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={handleCheckboxChange}
            />
            {tag}
          </label>
          <br />
        </React.Fragment>
      ))}

      <button id="b1" style={optionStyle} onClick={handleFilterByTags}>
        Filter by Tags
      </button>
      
    </div>
  );
}

export default Filter;