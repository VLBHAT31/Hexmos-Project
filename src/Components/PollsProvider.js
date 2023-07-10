import React, { createContext, useState, useEffect } from 'react';

export const PollsContext = createContext();

export const PollsProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedTags]);

  const handleTagSelection = (tags) => {
    setSelectedTags(tags);
  };

  const fetchData = async () => {
    try {
      const tagsQuery = selectedTags.join(',');
      const response = await fetch(`http://127.0.0.1:8000/polls/get_polls_by_tags/?tags=${tagsQuery}`);
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
    selectedTags,
    handleTagSelection,
    polls,
  };

  return (
    <PollsContext.Provider value={contextValue}>
      {children}
    </PollsContext.Provider>
  );
};