import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  FiClock, FiCalendar, FiSearch, FiChevronLeft 
} from "react-icons/fi";


import { createAttendanceRecord, fetchEmployeeAttendance, updateAttendanceRecord } from "../../features/attendence/attendenceThunk";

import toast from "react-hot-toast";

import AttendanceDetails from "../../components/attendence/AttendanceDetails";
import LoadingPage from "../../components/layout/LoadingPage";
import Table from "../../components/attendence/Table";

export default function EmployeeAttendancePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { employeeRecords, currentRecord, summary, loading } = 
    useSelector((state) => state.attendance);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list', 'details'

  useEffect(() => {
    dispatch(fetchEmployeeAttendance(user._id, { 
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }));
  }, [dispatch, user._id]);

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setViewMode("details");
  };

  const handleClockIn = () => {
    dispatch(createAttendanceRecord({
      employeeId: user._id,
      attendanceStatus: "present",
      clockInTime: new Date(),
      workLocation: "Office"
    }))
      .unwrap()
      .then(() => toast.success("Clocked in successfully"))
      .catch(error => toast.error(error.message));
  };

  const handleClockOut = (recordId) => {
    dispatch(updateAttendanceRecord(recordId, { 
      clockOutTime: new Date() 
    }, false))
      .unwrap()
      .then(() => toast.success("Clocked out successfully"))
      .catch(error => toast.error(error.message));
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedRecord(null);
  };

  const columns = [
    { 
      header: "Date", 
      accessor: (record) => new Date(record.attendanceDate).toLocaleDateString(),
      sortable: true,
      accessorKey: "attendanceDate"
    },
    { 
      header: "Status", 
      accessor: (record) => (
        <span className={`badge ${record.attendanceStatus === 'present' ? 'badge-success' : 'badge-error'}`}>
          {record.attendanceStatus}
        </span>
      )
    },
    { 
      header: "Clock In", 
      accessor: (record) => record.clockInTime 
        ? new Date(record.clockInTime).toLocaleTimeString() 
        : "N/A"
    },
    { 
      header: "Clock Out", 
      accessor: (record) => record.clockOutTime 
        ? new Date(record.clockOutTime).toLocaleTimeString() 
        : (
            record.attendanceStatus === 'present' && !record.clockOutTime
              ? <button 
                  onClick={() => handleClockOut(record._id)}
                  className="btn btn-xs btn-primary"
                >
                  Clock Out
                </button>
              : "N/A"
          )
    },
    { 
      header: "Hours", 
      accessor: (record) => record.hoursWorked?.toFixed(2) || "N/A"
    },
    { 
      header: "Approval", 
      accessor: (record) => (
        <span className={`badge ${
          record.approvalStatus === 'approved' ? 'badge-success' :
          record.approvalStatus === 'rejected' ? 'badge-error' : 'badge-warning'
        }`}>
          {record.approvalStatus}
        </span>
      )
    },
    {
      header: "Actions",
      accessor: (record) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleViewRecord(record)}
            className="btn btn-xs btn-info"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <LoadingPage />;

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              {viewMode === "details" ? "Attendance Details" : "My Attendance"}
            </h1>
            <p className="text-gray-300 text-sm">
              {viewMode === "details" 
                ? "View your attendance details" 
                : "Track your daily attendance"}
            </p>
          </div>
          
          {viewMode === "list" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleClockIn}
                className="btn btn-primary btn-sm"
                disabled={employeeRecords.some(r => 
                  r.attendanceStatus === 'present' && !r.clockOutTime
                )}
              >
                <FiClock /> Clock In
              </button>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search your records..."
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-base-100 border border-base-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {viewMode === "details" && (
            <button
              onClick={handleBackToList}
              className="btn btn-ghost btn-sm"
            >
              <FiChevronLeft /> Back to list
            </button>
          )}
        </div>

        {/* Summary Cards */}
        {viewMode === "list" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stats bg-base-100 shadow">
              <div className="stat">
                <div className="stat-title">Present Days</div>
                <div className="stat-value text-success">{summary.presentDays || 0}</div>
                <div className="stat-desc">This Month</div>
              </div>
            </div>
            
            <div className="stats bg-base-100 shadow">
              <div className="stat">
                <div className="stat-title">Absent Days</div>
                <div className="stat-value text-error">{summary.absentDays || 0}</div>
                <div className="stat-desc">This Month</div>
              </div>
            </div>
            
            <div className="stats bg-base-100 shadow">
              <div className="stat">
                <div className="stat-title">Total Hours</div>
                <div className="stat-value">{summary.totalHours?.toFixed(2) || 0}</div>
                <div className="stat-desc">This Month</div>
              </div>
            </div>
            
            <div className="stats bg-base-100 shadow">
              <div className="stat">
                <div className="stat-title">Pending Approval</div>
                <div className="stat-value text-warning">{summary.pendingApproval || 0}</div>
                <div className="stat-desc">This Month</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {viewMode === "details" ? (
          <AttendanceDetails 
            record={selectedRecord} 
            isManager={false}
          />
        ) : (
          <div className="bg-base-100 rounded-lg shadow overflow-hidden">
            <Table 
              data={employeeRecords.filter(r => 
                new Date(r.attendanceDate).toLocaleDateString()
                  .toLowerCase().includes(searchTerm.toLowerCase())
        )}
              columns={columns} 
              emptyMessage="No attendance records found"
            />
          </div>
        )}
      </div>
    </div>
  );
}