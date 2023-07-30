import React from 'react';
import { usePollsContext } from './PollsContext';
import { SecondaryButton } from './MyButton';
import './MyButton.css';

function Filter() {
  const { fetchDataByTags } = usePollsContext();
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);

  React.useEffect(() => {
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
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    }
  };

  const handleFilterByTags = () => {
    fetchDataByTags(selectedTags);
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

      <SecondaryButton name="Filter By Tags" size="small" onClick={handleFilterByTags} style={optionStyle}/>      
    </div>
  );
}

export default Filter;