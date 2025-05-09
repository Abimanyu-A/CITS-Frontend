import { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AssignmentModal({
  isOpen,
  onClose,
  employee,
  departments,
  teams,
  onAssignDepartment,
  onAssignTeam
}) {
  const [selectedDept, setSelectedDept] = useState(employee?.departmentId?._id || '');
  const [selectedTeam, setSelectedTeam] = useState(employee?.teamId?._id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDept && selectedDept !== employee?.departmentId?._id) {
      onAssignDepartment(employee._id, selectedDept);
    }
    if (selectedTeam && selectedTeam !== employee?.teamId?._id) {
      onAssignTeam(employee._id, selectedTeam);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-base-100 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Assign Department/Team</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-base-200 border border-base-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Team
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full bg-base-200 border border-base-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium rounded-md bg-base-200 hover:bg-base-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <FiCheck /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}