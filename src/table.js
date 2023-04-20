import React, { useState } from 'react';
import './App.css';

function Table({ rowData, columns, rowsPerPage, sortableColumns}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column) => {
    if (sortableColumns.includes(column)) { // Check if clicked column is sortable
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === column && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key: column, direction });
    }
  };

  const sortedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const rowsToShow = rowData.slice(startIndex, endIndex);
  
    return rowsToShow.sort((a, b) => {
      const column = sortConfig.key;
      let valueA = a[column];
      let valueB = b[column];
      
      // check if column data is a string date
      if (typeof a[column] === 'string' && isNaN(Date.parse(a[column])) === false) {
        valueA = new Date(a[column]);
      }
      if (typeof b[column] === 'string' && isNaN(Date.parse(b[column])) === false) {
        valueB = new Date(b[column]);
      }
      console.log(valueA, valueB);
      if (valueA < valueB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };
  

  const pageCount = Math.ceil(rowData.length / rowsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const ThData = () => {
    return columns.map((col, ind) => {
      return (
        <th key={ind} onClick={() => handleSort(col)}>
          {col}
          {sortConfig && sortConfig.key === col && (
            <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
          )}
        </th>
      );
    });
  };
  

  const tdData = () => {
    return sortedData().map((item, index) => {
      return (
        <tr key={index}>
          {columns.map((v, i) => {
            return <td key={i}>{item[v]}</td>;
          })}
        </tr>
      );
    });
  };

  const paginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageClick(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>{ThData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </table>
      <div className="pagination">{paginationButtons()}</div>
    </div>
  );
}

export default Table;
