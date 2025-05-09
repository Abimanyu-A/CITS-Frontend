import { FiClock, FiUser, FiCheck, FiX, FiCalendar, FiMapPin } from "react-icons/fi";
import RatingIndicator from "../ui/RatingIndicator";

export default function AttendanceDetails({ record, onEdit, isManager }) {
  if (!record) return null;

  return (
    <div className="bg-base-100 rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold">
            {isManager 
              ? `${record.employeeId.firstName} ${record.employeeId.lastName}'s Attendance`
              : "Your Attendance Record"}
          </h2>
          <p className="text-gray-500 text-sm">
            {new Date(record.attendanceDate).toLocaleDateString()} • {record.workLocation}
          </p>
        </div>
        
        {isManager && (
          <button 
            onClick={onEdit}
            className="btn btn-sm btn-warning"
          >
            Edit
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FiClock /> Status
          </h3>
          <div className="flex items-center gap-4">
            <span className={`text-2xl font-bold ${
              record.attendanceStatus === 'present' ? 'text-success' : 'text-error'
            }`}>
              {record.attendanceStatus}
            </span>
          </div>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FiUser /> Approval Status
          </h3>
          <span className={`text-lg font-bold ${
            record.approvalStatus === 'approved' ? 'text-success' :
            record.approvalStatus === 'rejected' ? 'text-error' : 'text-warning'
          }`}>
            {record.approvalStatus}
          </span>
          {record.approvalStatus === 'rejected' && record.rejectionReason && (
            <p className="mt-2 text-sm">Reason: {record.rejectionReason}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FiCalendar /> Clock In
          </h3>
          <p className="text-lg">
            {record.clockInTime 
              ? new Date(record.clockInTime).toLocaleString() 
              : "N/A"}
          </p>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FiCalendar /> Clock Out
          </h3>
          <p className="text-lg">
            {record.clockOutTime 
              ? new Date(record.clockOutTime).toLocaleString() 
              : "N/A"}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FiClock /> Hours Worked
          </h3>
          <p className="text-2xl font-bold">
            {record.hoursWorked?.toFixed(2) || "0.00"} hours
          </p>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FiMapPin /> Work Location
          </h3>
          <p className="text-lg">{record.workLocation}</p>
        </div>
      </div>
      
      {isManager && (
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Notes</h3>
          <p className="whitespace-pre-wrap">
            {record.notes || "No additional notes"}
          </p>
        </div>
      )}
    </div>
  );
}