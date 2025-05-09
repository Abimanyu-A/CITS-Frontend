import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState, useMemo } from "react";

export default function Table({ data = [], columns = [], emptyMessage = "No data available" }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      // Handle nested objects (like employeeId.firstName)
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
  }, [data, sortConfig]);

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
                className={`${column.sortable ? 'cursor-pointer hover:bg-base-200' : ''}`}
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
            <tr key={item._id || rowIndex} className="hover:bg-base-200">
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
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
}