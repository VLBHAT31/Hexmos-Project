import React, { createContext, useState, useContext } from 'react';

const PollsContext = createContext();

export const PollsProvider = ({ children }) => {
  const [pollsData, setPollsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/polls/get_poll/');
      const data = await response.json();
      setPollsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataByTags = async (selectedTags) => {
    if (selectedTags.length > 0) {
      const tagsQuery = selectedTags.join(',');
      fetch(`http://127.0.0.1:8000/polls/get_polls_by_tags/?tags=${tagsQuery}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPollsData(data);
        })
        .catch(error => console.error(error));
    } else {
      fetchData();
    }
  };

  return (
    <PollsContext.Provider value={{ pollsData, setPollsData, fetchDataByTags }}>
      {children}
    </PollsContext.Provider>
  );
};

export const usePollsContext = () => useContext(PollsContext);
export default PollsContext;