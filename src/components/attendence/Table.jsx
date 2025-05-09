import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import PropTypes from "prop-types";

const Table = ({ 
  data = [], 
  columns = [], 
  emptyMessage = "No data available",
  onRowClick,
  rowClassName = ""
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    // Handle nested object properties (e.g., employeeId.firstName)
    const getValue = (obj, key) => {
      return key.split('.').reduce((o, k) => (o || {})[k], obj);
    };

    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' 
      ? <FiChevronUp className="ml-1 inline" /> 
      : <FiChevronDown className="ml-1 inline" />;
  };

  if (data.length === 0) {
    return (
      <div className="bg-base-100 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                className={`${column.sortable ? 'cursor-pointer hover:bg-base-200' : ''} ${column.headerClassName || ''}`}
                onClick={() => column.sortable && requestSort(column.accessorKey || column.header)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && getSortIcon(column.accessorKey || column.header)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIndex) => (
            <tr 
              key={item._id || rowIndex} 
              className={`hover:bg-base-200 ${rowClassName} ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.cellClassName || ''}>
                  {typeof column.accessor === 'function' 
                    ? column.accessor(item) 
                    : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      accessorKey: PropTypes.string, // For sorting nested properties
      sortable: PropTypes.bool,
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string
    })
  ).isRequired,
  emptyMessage: PropTypes.string,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string
};

Table.defaultProps = {
  data: [],
  emptyMessage: "No data available"
};

export default Table;