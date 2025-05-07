import { motion } from "framer-motion";
import { FiUser, FiPhone, FiMail, FiBriefcase, FiDollarSign, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

export default function Table({ employees, onView, onEdit, onDelete }) {
  return (
    <div className="bg-base-100/50 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Mobile Cards View */}
      <div className="md:hidden space-y-3 p-4">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <motion.div 
              key={employee._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-base-100/30 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {employee.photo && employee.photo !== 'default.jpg' ? (
                      <img 
                        src={employee.photo} 
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-primary text-xl" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {employee.userID?.role}
                    </div>
                  </div>
                </div>
                <span className={`px-2 text-xs leading-5 font-semibold rounded-full 
                  ${employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {employee.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FiBriefcase className="text-gray-400" />
                  <span className="text-gray-300">{employee.position}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiDollarSign className="text-gray-400" />
                  <span className="text-gray-300">${employee.salary?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiMail className="text-gray-400" />
                  <span className="text-gray-300 truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiPhone className="text-gray-400" />
                  <span className="text-gray-300">{employee.phone}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-3 pt-3 border-t border-base-200/50">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onView(employee)}
                  className="text-blue-400 hover:text-blue-600 p-1"
                  title="View Profile"
                >
                  <FiEye />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(employee)}
                  className="text-yellow-400 hover:text-yellow-600 p-1"
                  title="Edit"
                >
                  <FiEdit2 />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(employee._id)}
                  className="text-red-400 hover:text-red-600 p-1"
                  title="Delete"
                >
                  <FiTrash2 />
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center p-6 text-sm text-gray-400">
            No employees found
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-base-200">
          <thead className="bg-base-200/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Position</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-base-100/30 divide-y divide-base-200">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <motion.tr 
                  key={employee._id} 
                  className="hover:bg-base-200/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        {employee.photo && employee.photo !== 'default.jpg' ? (
                          <img 
                            src={employee.photo} 
                            alt={`${employee.firstName} ${employee.lastName}`}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-primary" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {employee.userID?.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{employee.position}</div>
                    <div className="text-xs text-gray-500">${employee.salary?.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{employee.email}</div>
                    <div className="text-xs text-gray-500">{employee.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onView(employee)}
                        className="text-blue-400 hover:text-blue-600"
                        title="View Profile"
                      >
                        <FiEye />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(employee)}
                        className="text-yellow-400 hover:text-yellow-600"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(employee._id)}
                        className="text-red-400 hover:text-red-600"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-400">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}