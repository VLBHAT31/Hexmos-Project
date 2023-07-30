import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { setSortBy, setSortOrder } from './actions';

function MyTable({ columns, data, style, pageName }) {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sortBy[pageName]);
  const sortOrder = useSelector((state) => state.sortOrder[pageName]);

  const handleSort = (field) => {
    if (sortBy === field) {
      dispatch(setSortOrder(pageName, sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(pageName, field));
      dispatch(setSortOrder(pageName, 'asc'));
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <TableContainer>
      <Table style={style}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>
                <TableSortLabel
                  active={sortBy === column.field}
                  direction={sortOrder}
                  onClick={() => handleSort(column.field)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
