'use client';

import React, { useState } from 'react';

const FlexibleTable = ({ 
  heading = "My Table", 
  columns = ["Column 1", "Column 2", "Column 3"], 
  data = [] 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Sample data generator if no data provided
  const sampleData = data.length > 0 ? data : [
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-1` }), {}),
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-2` }), {}),
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-3` }), {}),
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-4` }), {}),
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-5` }), {}),
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-6` }), {}),
    columns.reduce((obj, col, index) => ({ ...obj, [col]: `Sample ${index + 1}-7` }), {}),
  ];
  
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sampleData.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          Showing {startIndex + 1} of {sampleData.length} items
        </div>
        <div className="flex items-center">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default FlexibleTable;
