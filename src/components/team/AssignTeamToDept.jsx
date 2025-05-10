import { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import Button from "../element/Button";

const AssignTeamToDept = ({ team, departments, onAssign, onClose }) => {
  const [selectedDept, setSelectedDept] = useState(team?.department || '');
  console.log(departments)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDept) return;
    onAssign(selectedDept);
  };

  return (
    <div className="bg-base-200 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Assign Team to Department</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <FiX size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.DeptName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={<FiCheck />}>
            Assign
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignTeamToDept;