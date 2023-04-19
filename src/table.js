import React, { useState } from 'react';
import './App.css';

function Table({ rowData, columns, rowsPerPage }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = rowData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });



  const pageCount = Math.ceil(sortedData.length / rowsPerPage);

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
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const rowsToShow = sortedData.slice(startIndex, endIndex);

    return rowsToShow.map((item, index) => {
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
