import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const DeptList = ({ depts, selectedDept, onSelectDept, onEdit, onDelete }) => {
  return (
    <div className="lg:col-span-1 bg-base-100 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-base-200 border-b border-base-300">
        <h2 className="text-xl font-semibold">Departments</h2>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
        {depts.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No departments found
          </div>
        ) : (
          <ul className="divide-y divide-base-300">
            {depts.map((dept) => (
              <motion.li
                key={dept._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 hover:bg-base-200 cursor-pointer transition-colors ${
                  selectedDept?._id === dept._id ? "bg-base-250" : ""
                }`}
                onClick={() => onSelectDept(dept)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{dept.DeptName}</h3>
                    <p className="text-sm text-gray-400">
                      Budget: ${dept.Budget}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(dept);
                      }}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(dept);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeptList;