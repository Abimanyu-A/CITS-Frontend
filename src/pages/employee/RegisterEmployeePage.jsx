import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser, FiPhone, FiMail, FiBriefcase, FiDollarSign, FiKey, FiSave
} from "react-icons/fi";
import TextInput from "../../components/form/TextInput";
import SelectInput from "../../components/form/SelectInput";
import { toast } from "react-toastify";
import { registerEmployee } from "../../features/emp/empService";
import LoadingPage from "../../components/layout/LoadingPage";

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
];

export default function RegisterEmployeePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
    role: 'employee'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerEmployee(formData);
      toast.success("Employee registered successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to register employee");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading){
    return <LoadingPage/>
  }

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-6">
            <div className="bg-primary/20 rounded-full p-4">
              <FiUser className="text-primary w-8 h-8" />
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Register New Employee
          </h1>

          <p className="text-gray-300">
            Fill in the employee details to create their account
          </p>
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
          </div>
          
          <div className="flex justify-end gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex justify-center items-center gap-2 py-3 px-6 border border-gray-600 rounded-full shadow-sm text-sm font-bold bg-transparent hover:bg-base-100/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-bold ${loading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {loading ? 'Registering...' : 'Register Employee'} <FiSave className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}