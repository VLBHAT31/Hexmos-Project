import React, { createContext, useState, useEffect } from 'react';

export const PollsContext = createContext();

export const PollsProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [polls, setPolls] = useState([]);
  const [filteredPolls, setFilteredPolls] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/polls/get_poll/');
      const data = await response.json();
      const pollsWithData = data.map((poll, index) => ({
        ...poll,
        id: index + 1,
      }));
      setPolls(pollsWithData);
      setFilteredPolls(pollsWithData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTagSelection = (tags) => {
    setSelectedTags(tags);
  };

  const filterByTags = () => {
    let filteredData;
    if (selectedTags.length > 0) {
      filteredData = polls.filter(poll => poll.Tags.some(tag => selectedTags.includes(tag)));
    } else {
      filteredData = polls;
    }
    setFilteredPolls(filteredData);
  };

  const resetFilter = () => {
    setFilteredPolls(polls); // Reset the filtered polls to all polls
  };

  const contextValue = {
    selectedTags,
    handleTagSelection,
    filteredPolls,
    filterByTags,
    resetFilter,
  };

  return (
    <PollsContext.Provider value={contextValue}>
      {children}
    </PollsContext.Provider>
  );
};