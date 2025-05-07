import { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMail, FiBriefcase, FiDollarSign, FiKey, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../modal/Modal";
import TextInput from "../form/TextInput";
import SelectInput from "../form/SelectInput";
import Button from "../element/Button";
import { registerEmployee } from "../../features/emp/empService";
import { updateEmployee } from "../../features/emp/empService";

const roleOptions = [
  { value: "ceo", label: "CEO" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
];

const statusOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Intern", label: "Intern" },
];

export default function EmployeeFormModal({ isOpen, onClose, employee, editMode, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    position: employee?.position || '',
    salary: employee?.salary || '',
    employmentStatus: employee?.employmentStatus || 'Full-time',
    role: employee?.userID?.role || 'employee',
    isActive: employee?.isActive ?? true
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        position: employee.position || '',
        salary: employee.salary || '',
        employmentStatus: employee.employmentStatus || 'Full-time',
        role: employee.userID?.role || 'employee',
        isActive: employee.isActive ?? true
      });
    }
  }, [employee]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode && employee) {
        const employeeId = employee._id;
        await updateEmployee(
          employeeId,
          formData
        );
        toast.success("Employee updated successfully!");
      } else {
        await registerEmployee(formData);
        toast.success("Employee registered successfully!");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to process employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <div className="bg-primary/20 rounded-full p-4 inline-block mb-4">
          <FiUser className="text-primary w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          {editMode ? 'Edit Employee' : 'Register New Employee'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            icon={<FiUser />}
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          
          <TextInput
            icon={<FiUser />}
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          
          <TextInput
            icon={<FiMail />}
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={editMode}
          />
          
          <TextInput
            icon={<FiPhone />}
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <TextInput
            icon={<FiBriefcase />}
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          
          <TextInput
            icon={<FiDollarSign />}
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          
          <SelectInput
            icon={<FiKey />}
            label="Role"
            name="role"
            value={formData.role}
            options={roleOptions}
            onChange={handleChange}
          />
          
          <SelectInput
            icon={<FiBriefcase />}
            label="Employment Status"
            name="employmentStatus"
            value={formData.employmentStatus}
            options={statusOptions}
            onChange={handleChange}
          />
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-base-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm text-white">
              Active Employee
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-4">
          <Button 
            onClick={onClose}
            variant="secondary"
          >
            Cancel
          </Button>
          
          <Button 
            type="submit"
            loading={loading}
            icon={<FiSave />}
          >
            {editMode ? 'Update' : 'Register'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}