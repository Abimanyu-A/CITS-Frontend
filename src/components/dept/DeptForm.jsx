const DeptForm = ({ 
    dept, 
    errors, 
    employees, 
    onChange, 
    onSelectChange, 
    onSubmit, 
    onCancel, 
    isEditing 
  }) => {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="DeptName">
            Department Name
          </label>
          <input
            type="text"
            id="DeptName"
            name="DeptName"
            value={dept.DeptName}
            onChange={onChange}
            className={`input input-bordered w-full ${errors.DeptName ? 'input-error' : ''}`}
          />
          {errors.DeptName && (
            <p className="mt-1 text-sm text-error">{errors.DeptName}</p>
          )}
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="DeptHeadID">
            Department Head
          </label>
          <select
            id="DeptHeadID"
            name="DeptHeadID"
            value={dept.DeptHeadID}
            onChange={(e) => onSelectChange("DeptHeadID", e.target.value)}
            className={`select select-bordered w-full ${errors.DeptHeadID ? 'select-error' : ''}`}
          >
            <option value="">Select Department Head</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName} ({emp.position})
              </option>
            ))}
          </select>
          {errors.DeptHeadID && (
            <p className="mt-1 text-sm text-error">{errors.DeptHeadID}</p>
          )}
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="Budget">
            Budget ($)
          </label>
          <input
            type="number"
            id="Budget"
            name="Budget"
            value={dept.Budget}
            onChange={onChange}
            min="0"
            step="0.01"
            className={`input input-bordered w-full ${errors.Budget ? 'input-error' : ''}`}
          />
          {errors.Budget && (
            <p className="mt-1 text-sm text-error">{errors.Budget}</p>
          )}
        </div>
  
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {isEditing ? 'Update Department' : 'Create Department'}
          </button>
        </div>
      </form>
    );
  };
  
  export default DeptForm;