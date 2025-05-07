import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems }) {
  const ITEMS_PER_PAGE = 10
  const maxVisiblePages = 5;
  
  // Calculate the range of pages to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust if we're at the start or end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-base-200/30 px-4 py-3 flex items-center justify-between border-t border-base-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-base-300 text-sm font-medium rounded-md ${
            currentPage === 1 ? 'bg-base-100 text-gray-500 cursor-not-allowed' : 'bg-base-100 text-gray-400 hover:bg-base-200'
          }`}
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-base-300 text-sm font-medium rounded-md ${
            currentPage === totalPages ? 'bg-base-100 text-gray-500 cursor-not-allowed' : 'bg-base-100 text-gray-400 hover:bg-base-200'
          }`}
        >
          Next
        </motion.button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-base-300 text-sm font-medium ${
                currentPage === 1 ? 'bg-base-100 text-gray-500 cursor-not-allowed' : 'bg-base-100 text-gray-400 hover:bg-base-200'
              }`}
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </motion.button>
            
            {/* First page */}
            {startPage > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    1 === currentPage 
                      ? 'z-10 bg-primary border-primary text-white' 
                      : 'bg-base-100 border-base-300 text-gray-400 hover:bg-base-200'
                  }`}
                >
                  1
                </motion.button>
                {startPage > 2 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-base-300 bg-base-100 text-sm font-medium text-gray-400">
                    ...
                  </span>
                )}
              </>
            )}
            
            {/* Middle pages */}
            {pages.map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage 
                    ? 'z-10 bg-primary border-primary text-white' 
                    : 'bg-base-100 border-base-300 text-gray-400 hover:bg-base-200'
                }`}
              >
                {page}
              </motion.button>
            ))}
            
            {/* Last page */}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-base-300 bg-base-100 text-sm font-medium text-gray-400">
                    ...
                  </span>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(totalPages)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    totalPages === currentPage 
                      ? 'z-10 bg-primary border-primary text-white' 
                      : 'bg-base-100 border-base-300 text-gray-400 hover:bg-base-200'
                  }`}
                >
                  {totalPages}
                </motion.button>
              </>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-base-300 text-sm font-medium ${
                currentPage === totalPages ? 'bg-base-100 text-gray-500 cursor-not-allowed' : 'bg-base-100 text-gray-400 hover:bg-base-200'
              }`}
            >
              <span className="sr-only">Next</span>
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </nav>
        </div>
      </div>
    </div>
  );
}