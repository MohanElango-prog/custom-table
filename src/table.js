import React, { useState } from 'react';
import './App.css';

function Table({ rowData, columns, sortableColumns }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [toggleColumns, setToggleColumns] = useState(columns);

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  const handleToggleColumn = (col) => {
    if (toggleColumns.includes(col)) {
      // Remove column from toggleColumns if it exists
      setToggleColumns(toggleColumns.filter((column) => column !== col));
    } else {
      // Add column to toggleColumns if it doesn't exist
      setToggleColumns([...toggleColumns, col]);
    }
    console.log(toggleColumns);
  };
  

  const popupContent = (
    <div className="popupContent">
      {columns.map((col, ind) => (
        <div key={ind}>
          <input
            type="checkbox"
            id={col}
            name={col}
            checked={!toggleColumns || toggleColumns.includes(col)}
            onChange={() => handleToggleColumn(col)}
          />
          <label htmlFor={col}>{col}</label>
        </div>
      ))}
    </div>
  );

  const pageCount = Math.ceil(rowData.length / rowsPerPage);

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
    const rowsToShow = rowData
      .filter((row) =>
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .slice(startIndex, endIndex);
    console.log(rowsToShow);

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

      if (valueA < valueB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const ThData = () => {
    return toggleColumns.map((col, ind) => {
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
          {toggleColumns.map((v, i) => {
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
    <div className="tableWrapper">
      <div className="tableContainer">
      <input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    paddingRight: '30px', // Add right padding for the dots
  }}
/>
<span className="popupButton" onClick={handlePopupClick}>
  &#8942;
</span>
{showPopup && popupContent}

        <table className="table">
          <thead>
            <tr>{ThData()}</tr>
          </thead>
          <tbody>{tdData()}</tbody>
        </table>
        <div className= "pagination">
          <div clasName = "tableDet">
            <span>Page {currentPage} of {pageCount}</span>
            <span style={{ marginLeft: '10px' }}>Showing {rowsPerPage * currentPage} of {rowData.length} entries</span>
          </div>
          <div className="paginationButtons">
            <button onClick={() => handlePageClick(1)}>First</button>
            <button onClick={() => handlePageClick(currentPage - 1)}>Previous</button>
            {paginationButtons().slice(currentPage - 1, currentPage + 2)}
            <button onClick={() => handlePageClick(currentPage + 1)}>Next</button>
            <button onClick={() => handlePageClick(pageCount)}>Last</button>
          </div>
          <div className="tablePagination">
            <div>
              <span style={{ marginRight: '10px' }}>Rows per page:</span>
              <select onChange={(e) => setRowsPerPage(e.target.value)}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
