'use client';

import React, { useState, useMemo } from 'react';

const FlexibleTable = ({ 
  heading = "My Table", 
  columns = ["Column 1", "Column 2", "Column 3"], 
  data = [],
  showSearch = true,
  showEntriesSelector = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data generator if no data provided
  const sampleData = data.length > 0 ? data : [
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-1` }), {}), id: 1 },
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-2` }), {}), id: 2 },
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-3` }), {}), id: 3 },
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-4` }), {}), id: 4 },
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-5` }), {}), id: 5 },
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-6` }), {}), id: 6 },
    { ...columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-7` }), {}), id: 7 },
  ];

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return sampleData;
    
    return sampleData.filter(row =>
      columns.some(column => 
        String(row[column] || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sampleData, searchTerm, columns]);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (entries) => {
    setItemsPerPage(entries);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  const renderPaginationButtons = () => {
    const buttons = [];
    
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded text-sm ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
  };
  
  return (
    <div className="bg-sidebar-bg rounded-2xl shadow-sm border border-gray-200 p-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{heading}</h2>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 gap-4">
        {/* Entries per page selector */}
        {showEntriesSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
        )}
        
        {/* Search */}
        {showSearch && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
            />
          </div>
        )}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-3 px-4 text-sm text-gray-700">
                    {row[column] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer with pagination and showing info */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div>
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex items-center">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default FlexibleTable;
