import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style1.css';

function Form() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [tags, setTags] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionRemove = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleTagChange = (e) => {
    setTags(e.target.value);
  };

  const handleCreatePoll = async () => {
    try {
      if (question.trim() === '') {
        alert('Question cannot be empty');
        return;
      }

      const nonEmptyOptions = options.filter(option => option.trim() !== '');
      if (nonEmptyOptions.length < 2) {
        alert('At least two choices should be present');
        return;
      }

      const nonEmptyTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      if (nonEmptyTags.length === 0) {
        alert('At least one tag should be entered');
        return;
      }

      const payload = {
        Question: question,
        OptionVote: Object.fromEntries(nonEmptyOptions.map(option => [option, '0'])),
        Tags: nonEmptyTags,
      };

      // Perform API call to create the poll
      const response = await fetch('http://127.0.0.1:8000/polls/create_poll/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Redirect to the specified URL after creating the poll
        navigate('/');
      } else {
        alert('Failed to create the poll');
      }
    } catch (error) {
      console.error(error);
    }
  };

  let formStyle = {
    margin: '30px',
  };

  let inputStyle = {
    marginBottom: '10px',
    display: 'block', // Add this CSS property to display each option in a new line
    position: 'relative',
  };

  let closeButtonStyle = {
    color:'red',
    position: 'absolute',
    right:"60px",
    top: '40%',
    transform: 'translateY(-40%)',
    cursor: 'pointer',
  };

  return (
    <div style={formStyle}>
      <div id="d1">
        <h3>Question</h3>
        <input
          type="text"
          placeholder="Type your poll question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={inputStyle}
        />
        <h3>Answer Options</h3>
        {options.map((option, index) => (
          <div key={index}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                style={inputStyle}
              />
              {index > 1 && (
                <span
                  className="close-icon"
                  onClick={() => handleOptionRemove(index)}
                  style={closeButtonStyle}
                >
                  ✕
                </span>
              )}
            </div>
          </div>
        ))}
        <button onClick={handleAddOption}>Add Option</button>
        <h3>Comma Separated Tags</h3>
        <input
          type="text"
          placeholder="Tag1,tag2,tag3"
          value={tags}
          onChange={handleTagChange}
          style={inputStyle}
        />
        <br /><br/>
      </div>
      <button style={{ height: "40px", width: "200px" }} onClick={handleCreatePoll}>Create Poll</button>
    </div>
  );
}

export default Form;
