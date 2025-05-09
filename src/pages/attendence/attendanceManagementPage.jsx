import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  FiClock, FiUser, FiCheck, FiX, FiSearch, 
  FiChevronLeft, FiPlus, FiCalendar, FiMapPin 
} from "react-icons/fi";
import { toast } from "react-toastify";
import { 
  fetchAllAttendance,
  fetchAttendanceRecord,
  createAttendanceRecord,
  updateAttendanceRecord,
  updateAttendanceStatus,
  deleteAttendanceRecord
} from "../../features/attendence/attendenceThunk";

import AttendanceDetails from "../../components/attendence/AttendanceDetails";
import AttendanceFormModal from "../../components/attendence/AttendanceFormModal";
import LoadingPage from "../../components/layout/LoadingPage";
import Table from "../../components/attendence/Table";
import Pagination from "../../components/layout/Pagination";

const ITEMS_PER_PAGE = 10;

export default function AttendanceManagementPage() {
  const dispatch = useDispatch();
  const { records, currentRecord, loading, pagination } = 
    useSelector((state) => state.attendance);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list', 'details'
  const [filter, setFilter] = useState({
    status: "",
    location: "",
    approval: ""
  });

  useEffect(() => {
    dispatch(fetchAllAttendance({ 
      page: currentPage, 
      limit: ITEMS_PER_PAGE,
      ...filter
    }));
  }, [dispatch, currentPage, filter]);

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setViewMode("details");
  };

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAddRecord = () => {
    setSelectedRecord(null);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleStatusChange = (recordId, status) => {
    dispatch(updateAttendanceStatus(recordId, { 
      status,
      rejectionReason: status === "rejected" ? "Please correct your attendance" : ""
    }))
      .unwrap()
      .then(() => toast.success(`Attendance ${status} successfully`))
      .catch(error => toast.error(error.message));
  };

  const handleDeleteRecord = (recordId) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      dispatch(deleteAttendanceRecord(recordId))
        .unwrap()
        .then(() => toast.success("Attendance record deleted"))
        .catch(error => toast.error(error.message));
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedRecord(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const columns = [
    { 
      header: "Employee", 
      accessor: (record) => `${record.employeeId.firstName} ${record.employeeId.lastName}`,
      sortable: true,
      accessorKey: "employeeId.firstName"
    },
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
      header: "Hours", 
      accessor: (record) => record.hoursWorked?.toFixed(2) || "N/A",
      sortable: true,
      accessorKey: "hoursWorked"
    },
    { 
      header: "Location", 
      accessor: (record) => (
        <span className="badge badge-info">
          {record.workLocation}
        </span>
      )
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
          <button 
            onClick={() => handleEditRecord(record)}
            className="btn btn-xs btn-warning"
          >
            Edit
          </button>
          {record.approvalStatus === 'pending' && (
            <>
              <button 
                onClick={() => handleStatusChange(record._id, 'approved')}
                className="btn btn-xs btn-success"
              >
                Approve
              </button>
              <button 
                onClick={() => handleStatusChange(record._id, 'rejected')}
                className="btn btn-xs btn-error"
              >
                Reject
              </button>
            </>
          )}
          <button 
            onClick={() => handleDeleteRecord(record._id)}
            className="btn btn-xs btn-error"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <LoadingPage />;

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              {viewMode === "details" ? "Attendance Details" : "Attendance Management"}
            </h1>
            <p className="text-gray-300 text-sm">
              {viewMode === "details" 
                ? "View and manage attendance details" 
                : "Manage all employee attendance records"}
            </p>
          </div>
          
          {viewMode === "list" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex gap-2">
                <select
                  name="status"
                  value={filter.status}
                  onChange={handleFilterChange}
                  className="select select-bordered select-sm"
                >
                  <option value="">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
                
                <select
                  name="location"
                  value={filter.location}
                  onChange={handleFilterChange}
                  className="select select-bordered select-sm"
                >
                  <option value="">All Locations</option>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Field">Field</option>
                </select>
                
                <select
                  name="approval"
                  value={filter.approval}
                  onChange={handleFilterChange}
                  className="select select-bordered select-sm"
                >
                  <option value="">All Approval</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-base-100 border border-base-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={handleAddRecord}
                className="btn btn-primary btn-sm"
              >
                <FiPlus /> Add Record
              </button>
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

        {/* Main Content */}
        {viewMode === "details" ? (
          <AttendanceDetails 
            record={selectedRecord} 
            onEdit={() => handleEditRecord(selectedRecord)}
            isManager={true}
          />
        ) : (
          <>
            <div className="bg-base-100 rounded-lg shadow overflow-hidden">
              <Table 
                data={records.filter(r => 
                  `${r.employeeId.firstName} ${r.employeeId.lastName}`
                    .toLowerCase().includes(searchTerm.toLowerCase())
                )} 
                columns={columns} 
                emptyMessage="No attendance records found"
              />
            </div>
            
            {pagination.totalPages > 1 && (
              <div className="mt-4">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={pagination.totalRecords}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Attendance Form Modal */}
      <AttendanceFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        record={selectedRecord}
        editMode={editMode}
        isManager={true}
        onSuccess={(formData) => {
          if (editMode) {
            dispatch(updateAttendanceRecord(selectedRecord._id, formData))
              .unwrap()
              .then(() => {
                dispatch(fetchAllAttendance({ 
                  page: currentPage, 
                  limit: ITEMS_PER_PAGE,
                  ...filter
                }));
              });
          } else {
            dispatch(createAttendanceRecord(formData))
              .unwrap()
              .then(() => {
                dispatch(fetchAllAttendance({ 
                  page: 1, // Reset to first page
                  limit: ITEMS_PER_PAGE,
                  ...filter
                }));
              });
          }
        }}
      />
    </div>
  );
}