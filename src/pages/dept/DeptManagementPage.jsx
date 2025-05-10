import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { getAllDepts, deleteDept, createDept, updateDept } from "../../features/dept/deptThunk";
import { resetDepts } from "../../features/dept/deptSlice";
import DeptDetails from "../../components/dept/DeptDetails";
import DeptForm from "../../components/dept/DeptForm";
import Modal from "../../components/modal/Modal";
import DeptList from "../../components/dept/DeptList";
import Button from "../../components/element/Button";
import LoadingPage from "../../components/layout/LoadingPage";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const DeptManagementPage = () => {
  const dispatch = useDispatch();
  const { depts, status, error, hasFetched } = useSelector((state) => state.dept);
  const [selectedDept, setSelectedDept] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState(null);
  const [deptToEdit, setDeptToEdit] = useState(null);
  const [newDept, setNewDept] = useState({
    DeptName: '',
    DeptHeadID: '',
    Budget: ''
  });
  const employees = useSelector((state) => state.emp.allEmployees.data);
  const [errors, setErrors] = useState({
    DeptName: '',
    DeptHeadID: '',
    Budget: ''
  });

  useEffect(() => {
    if (!hasFetched) {
      dispatch(getAllDepts());
    }
  }, [dispatch, hasFetched]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      console.log(error)
      toast.error(error);
    }
  }, [error]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { DeptName: '', DeptHeadID: '', Budget: '' };

    if (!newDept.DeptName.trim()) {
      newErrors.DeptName = 'Department name is required';
      valid = false;
    }

    if (!newDept.DeptHeadID) {
      newErrors.DeptHeadID = 'Department head is required';
      valid = false;
    }

    if (!newDept.Budget || isNaN(newDept.Budget) || Number(newDept.Budget) <= 0) {
      newErrors.Budget = 'Valid budget amount is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCreateDept = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(createDept({ dept: newDept })).unwrap();
      toast.success('Department created successfully!');
      setIsCreateModalOpen(false);
      setNewDept({ DeptName: '', DeptHeadID: '', Budget: '' });
      dispatch(resetDepts());
    } catch (error) {
      toast.error(error.message || 'Failed to create department');
    }
  };

  const handleUpdateDept = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(updateDept({ 
        deptId: deptToEdit._id, 
        updates: newDept
      })).unwrap();
      toast.success('Department updated successfully!');
      setIsEditModalOpen(false);
      setNewDept({ DeptName: '', DeptHeadID: '', Budget: '' });
      setDeptToEdit(null);
    } catch (error) {
      toast.error(error.message || 'Failed to update department');
    }
  };

  const handleDeleteDept = async () => {
    try {
      await dispatch(deleteDept({ deptId: deptToDelete._id })).unwrap();
      toast.success('Department deleted successfully!');
      setIsDeleteModalOpen(false);
      setDeptToDelete(null);
      if (selectedDept?._id === deptToDelete._id) {
        setSelectedDept(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete department');
    }
  };

  const openEditModal = (dept) => {
    setDeptToEdit(dept);
    setNewDept({
      DeptName: dept.DeptName,
      DeptHeadID: dept.DeptHeadID?._id || '',
      Budget: dept.Budget
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (dept) => {
    setDeptToDelete(dept);
    setIsDeleteModalOpen(true);
  };

  if (status === 'loading' && !hasFetched) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Department Management</h1>
            <p className="text-gray-300">Manage your departments and view their details</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              icon={<FiPlus className="w-4 h-4" />}
              variant="primary"
            >
              Create New Department
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DeptList
            depts={depts}
            selectedDept={selectedDept}
            onSelectDept={setSelectedDept}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
          
          <DeptDetails
            dept={selectedDept}
            onClose={() => setSelectedDept(null)}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Department"
      >
        <DeptForm
          dept={newDept}
          errors={errors}
          employees={employees}
          onChange={(e) => setNewDept({...newDept, [e.target.name]: e.target.value})}
          onSelectChange={(name, value) => setNewDept({...newDept, [name]: value})}
          onSubmit={handleCreateDept}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${deptToEdit?.DeptName}`}
      >
        <DeptForm
          dept={newDept}
          errors={errors}
          employees={employees}
          onChange={(e) => setNewDept({...newDept, [e.target.name]: e.target.value})}
          onSelectChange={(name, value) => setNewDept({...newDept, [name]: value})}
          onSubmit={handleUpdateDept}
          onCancel={() => setIsEditModalOpen(false)}
          isEditing
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete the department <span className="font-semibold">"{deptToDelete?.DeptName}"</span>? This action cannot be undone.
          </p>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteDept}
              variant="danger"
              icon={<FiTrash2 className="w-4 h-4" />}
            >
              Delete Department
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeptManagementPage;