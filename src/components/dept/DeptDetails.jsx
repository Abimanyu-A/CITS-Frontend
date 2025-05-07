import { motion } from "framer-motion";

const DeptDetails = ({ dept, onClose }) => {
  if (!dept) {
    return (
      <div className="hidden lg:block lg:col-span-2 bg-base-100 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h3 className="text-xl font-medium mb-2">No Department Selected</h3>
          <p className="text-gray-400">
            Select a department from the list to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lg:col-span-2 bg-base-100 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4 bg-base-200 border-b border-base-300 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{dept.DeptName}</h2>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-gray-300"
        >
          Close
        </button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-base-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Department Information</h3>
            <div className="space-y-2">
              <p>
                <span className="text-gray-400">Name:</span> {dept.DeptName}
              </p>
              <p>
                <span className="text-gray-400">Budget:</span> ${dept.Budget}
              </p>
              <p>
                <span className="text-gray-400">Created At:</span>{" "}
                {new Date(dept.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="bg-base-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Department Head</h3>
            {dept.DeptHeadID ? (
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Name:</span>{" "}
                  {dept.DeptHeadID?.firstName} {dept.DeptHeadID?.lastName}
                </p>
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  {dept.DeptHeadID?.email}
                </p>
                <p>
                  <span className="text-gray-400">Position:</span>{" "}
                  {dept.DeptHeadID?.position}
                </p>
              </div>
            ) : (
              <p className="text-gray-400">No department head assigned</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeptDetails;