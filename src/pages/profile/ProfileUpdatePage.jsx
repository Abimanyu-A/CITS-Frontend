import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiUser, FiPhone, FiHome, FiCalendar, FiActivity, FiUpload, FiSave
} from "react-icons/fi";
import { updateEmployeeProfile } from "../../features/emp/empThunk";
import { setFirstLogin } from "../../features/auth/authSlice";
import TextInput from "../../components/form/TextInput";
import DateInput from "../../components/form/DateInput";
import AddressInput from "../../components/form/AddressInput";
import EmergencyContactInput from "../../components/form/EmergencyContactInput";
import SkillsInput from "../../components/form/SkillsInput";
import DocumentUpload from "../../components/form/DocumentUpload";
import ImageUpload from "../../components/form/ImageUpload";
import { toast } from "react-toastify";

export default function ProfileUpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employee, status: empStatus } = useSelector((state) => state.emp);
  const { firstLogin, status: authStatus } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    dob: '',
    skills: [],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    documents: [],
    photo: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authStatus === "succeeded" && empStatus === "succeeded") {
      if (!employee) {
        navigate("/login");
      } else {
        console.log(employee)
        setFormData({
          firstName: employee.firstName || '',
          lastName: employee.lastName || '',
          phone: employee.phone || '',
          address: employee.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          dob: employee.dob || '',
          skills: employee.skills || [],
          emergencyContact: employee.emergencyContact || {
            name: '',
            relationship: '',
            phone: ''
          },
          documents: employee.documents || [],
          photo: employee.photo || ''
        });
      }
    }
  }, [employee, empStatus, authStatus, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateEmployeeProfile({
        employeeId: employee._id,
        updates: formData
      })).unwrap();

      dispatch(setFirstLogin());
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (
    authStatus === "loading" &&
    empStatus === "loading" &&
    firstLogin === null
  ) {
    return <p className="text-center text-white mt-10">Loading...</p>;
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
            {firstLogin ? 'Complete Your Profile' : 'Update Your Profile'}
          </h1>

          <p className="text-gray-300">
            {firstLogin
              ? "Please complete your profile before continuing"
              : "Keep your information current and accurate"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              icon={<FiUser />}
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
            
            <TextInput
              icon={<FiUser />}
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
            
            <TextInput
              icon={<FiPhone />}
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            
            <DateInput
              icon={<FiCalendar />}
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={(date) => setFormData({...formData, dob: date})}
            />
          </div>

          <div className="bg-base-100/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FiHome className="text-primary" /> Address Information
            </h3>
            <AddressInput
              address={formData.address}
              onChange={(address) => setFormData({...formData, address})}
            />
          </div>

          <div className="bg-base-100/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FiActivity className="text-primary" /> Emergency Contact
            </h3>
            <EmergencyContactInput
              contact={formData.emergencyContact}
              onChange={(emergencyContact) => setFormData({...formData, emergencyContact})}
            />
          </div>

          <div className="bg-base-100/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FiUser className="text-primary" /> Skills
            </h3>
            <SkillsInput
              skills={formData.skills}
              onChange={(skills) => setFormData({...formData, skills})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-100/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <FiUpload className="text-primary" /> Profile Photo
              </h3>
              <ImageUpload
                currentImage={formData.photo}
                onChange={(photo) => setFormData({...formData, photo})}
              />
            </div>

            <div className="bg-base-100/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <FiUpload className="text-primary" /> Documents
              </h3>
              <DocumentUpload
                documents={formData.documents}
                onChange={(documents) => setFormData({...formData, documents})}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-bold ${loading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {loading ? 'Saving...' : 'Save Changes'} <FiSave className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
