import { useState, useEffect } from "react";
import { FiX, FiUser, FiClock, FiCalendar, FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AttendanceFormModal({ 
  isOpen, 
  onClose, 
  record, 
  editMode, 
  onSuccess,
  isManager
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    attendanceDate: new Date().toISOString().split('T')[0],
    attendanceStatus: "present",
    clockInTime: "",
    clockOutTime: "",
    workLocation: "Office",
    notes: ""
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (record) {
      setFormData({
        employeeId: record.employeeId._id || record.employeeId,
        attendanceDate: new Date(record.attendanceDate).toISOString().split('T')[0],
        attendanceStatus: record.attendanceStatus,
        clockInTime: record.clockInTime ? new Date(record.clockInTime).toISOString().slice(0, 16) : "",
        clockOutTime: record.clockOutTime ? new Date(record.clockOutTime).toISOString().slice(0, 16) : "",
        workLocation: record.workLocation,
        notes: record.notes || ""
      });
    } else if (!isManager) {
      // Default for employee clock-in
      setFormData(prev => ({
        ...prev,
        clockInTime: new Date().toISOString().slice(0, 16),
        workLocation: "Office"
      }));
    }
  }, [record, isManager]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      onSuccess(formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (isManager && !formData.employeeId) {
      errors.employeeId = "Employee is required";
    }
    
    if (formData.attendanceStatus === "present") {
      if (!formData.clockInTime) errors.clockInTime = "Clock-in time is required";
      
      if (formData.clockOutTime && new Date(formData.clockOutTime) < new Date(formData.clockInTime)) {
        errors.clockOutTime = "Clock-out must be after clock-in";
      }
    }
    
    return errors;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">
            {editMode ? "Edit Attendance Record" : isManager ? "Create Attendance Record" : "Clock In"}
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {isManager && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiUser /> Employee
                </span>
              </label>
              <input
                type="text"
                value={formData.employeeId}
                className="input input-bordered"
                disabled
              />
              {errors.employeeId && (
                <p className="mt-1 text-sm text-error">{errors.employeeId}</p>
              )}
            </div>
          )}
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FiCalendar /> Date
              </span>
            </label>
            <input
              type="date"
              name="attendanceDate"
              value={formData.attendanceDate}
              onChange={handleChange}
              className="input input-bordered"
              disabled={!isManager}
            />
          </div>
          
          {isManager && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiClock /> Status
                </span>
              </label>
              <select
                name="attendanceStatus"
                value={formData.attendanceStatus}
                onChange={handleChange}
                className="select select-bordered"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          )}
          
          {formData.attendanceStatus === "present" && (
            <>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiClock /> Clock In Time
                  </span>
                </label>
                <input
                  type={isManager ? "datetime-local" : "time"}
                  name="clockInTime"
                  value={formData.clockInTime}
                  onChange={handleChange}
                  className="input input-bordered"
                  disabled={!isManager && editMode}
                />
                {errors.clockInTime && (
                  <p className="mt-1 text-sm text-error">{errors.clockInTime}</p>
                )}
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiClock /> Clock Out Time
                  </span>
                </label>
                <input
                  type={isManager ? "datetime-local" : "time"}
                  name="clockOutTime"
                  value={formData.clockOutTime}
                  onChange={handleChange}
                  className="input input-bordered"
                  disabled={!isManager && !editMode}
                />
                {errors.clockOutTime && (
                  <p className="mt-1 text-sm text-error">{errors.clockOutTime}</p>
                )}
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiMapPin /> Work Location
                  </span>
                </label>
                <select
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Field">Field</option>
                </select>
              </div>
            </>
          )}
          
          {isManager && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea textarea-bordered h-24"
                placeholder="Additional notes..."
              ></textarea>
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editMode ? "Update" : isManager ? "Create" : "Clock In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}