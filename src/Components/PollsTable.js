import React, { useEffect } from 'react';
import { usePollsContext } from './PollsContext';
import { Link } from 'react-router-dom';
import MyTable from './MyTable';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setSortBy, setSortOrder } from './actions';

function PollsTable({ pageName }) {
  const { pollsData, fetchDataByTags } = usePollsContext();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const sortColumn = useSelector((state) => state.sortBy[pageName]);
  const sortOrder = useSelector((state) => state.sortOrder[pageName]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetchDataByTags([]); 
  };

  const columns = [
    { field: 'number', label: 'Number', sortable: true },
    { field: 'question', label: 'Poll Question', sortable: true },
    { field: 'votes', label: 'Total Votes', sortable: true },
    { field: 'tags', label: 'Tags', sortable: true },
  ];

  const data = pollsData.map((poll, index) => ({
    number: index + 1,
    question: <Link to={`/polldetail/${index + 38}`}>{poll.Question}</Link>,
    votes: Object.values(poll.OptionVote).reduce((a, b) => a + b, 0),
    tags: poll.Tags.join(', '),
  }));

  const handleSort = (field) => {
    dispatch(setSortBy(pageName, field));
    dispatch(setSortOrder(pageName, sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div>
      <MyTable
        columns={columns}
        data={data}
        style={{ float: 'right', position: 'absolute', right: '30%', top: '16%', width: '50%' }}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSort={handleSort}
        pageName={pageName}
      />
    </div>
  );
}

export default PollsTable;
