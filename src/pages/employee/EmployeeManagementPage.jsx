import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiUser, FiPhone, FiMail, FiBriefcase, FiDollarSign, FiKey, 
  FiEdit2, FiTrash2, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { 
  getAllEmployees, 
  deleteEmployee 
} from "../../features/emp/empThunk";

import EmployeeProfile from "./EmployeeProfile";
import EmployeeFormModal from "../../components/employees/EmployeeFormModal";
import LoadingPage from "../../components/layout/LoadingPage";
import Table from "../../components/layout/Table";
import Pagination from "../../components/layout/Pagination";

const ITEMS_PER_PAGE = 10;

export default function EmployeeManagementPage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.emp);
  const employees = useSelector((state) => state.emp.allEmployees.data);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      await dispatch(getAllEmployees()).unwrap();
    } catch (error) {
      toast.error(error.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setEditMode(false);
    setModalOpen(true);
  
  };

  const handleDelete = (employeeId) => {
    setSelectedEmployee(null);
    setEditMode(false);
    setModalOpen(false);
    dispatch(deleteEmployee(employeeId))
    .unwrap()
    .then(() => {
      toast.success("Deleted Successfully")
    })
    .catch(error => {
      toast.error("Failed to Delete")
    });
  }

  const handleCloseProfile = () => {
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees?.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading && status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2 leading-tight">
              {selectedEmployee ? `${selectedEmployee.firstName}'s Profile` : 'Employee Management'}
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              {selectedEmployee ? 'View and manage employee details' : 'Manage your organization employees'}
            </p>
          </div>
          
          {!selectedEmployee && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-base-100 border border-base-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={handleAddNew}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-primary hover:bg-primary/90 rounded-full text-sm font-bold whitespace-nowrap"
              >
                <FiPlus className="text-lg" /> 
                <span className="hidden sm:inline">Add Employee</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        {selectedEmployee ? (
          <div className="space-y-4 md:space-y-6">
            <button
              onClick={handleCloseProfile}
              className="flex items-center gap-1 md:gap-2 text-gray-400 hover:text-white mb-2 md:mb-4 text-sm md:text-base"
            >
              <FiChevronLeft /> 
              <span>Back to employee list</span>
            </button>
            
            <EmployeeProfile 
              employee={selectedEmployee} 
              onEdit={() => handleEdit(selectedEmployee)} 
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table 
                employees={paginatedEmployees} 
                onView={handleViewProfile} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            </div>
            
            {filteredEmployees.length > 0 && (
              <div className="mt-4 md:mt-6">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={employees.length}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Employee Form Modal */}
      <EmployeeFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        employee={selectedEmployee}
        editMode={editMode}
        onSuccess={() => {
          fetchEmployees();
          if (editMode) {
            setSelectedEmployee(null);
          }
        }}
      />
    </div>
  );
}