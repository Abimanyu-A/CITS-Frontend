import { motion } from "framer-motion";
import {
  FiUser, FiPhone, FiMail, FiBriefcase, FiDollarSign, 
  FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiEdit
} from "react-icons/fi";
import { format } from "date-fns";
import Button from "../../components/element/Button";
import DocumentList from "../../components/employees/DocumentList";
import SkillsList from "../../components/employees/SkillsList";

export default function EmployeeProfile({ employee, onEdit }) {
  const {
    firstName,
    lastName,
    email,
    phone,
    position,
    salary,
    employmentStatus,
    documents,
    skills,
    isActive,
    photo,
    hireDate,
    userID
  } = employee;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-base-100/50 rounded-xl p-6 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
              {photo && photo !== 'default.jpg' ? (
                <img 
                  src={photo} 
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="text-primary w-16 h-16" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-base-100 rounded-full p-2 shadow-md">
              {isActive ? (
                <FiCheckCircle className="text-green-500" />
              ) : (
                <FiXCircle className="text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-400">{position}</p>
            </div>
            <Button 
              onClick={onEdit}
              icon={<FiEdit />}
              variant="secondary"
              size="sm"
            >
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-base-200 pb-2">
                Personal Information
              </h3>
              <div className="space-y-3">
                <ProfileDetail icon={<FiMail />} label="Email" value={email} />
                <ProfileDetail icon={<FiPhone />} label="Phone" value={phone} />
                <ProfileDetail 
                  icon={<FiCalendar />} 
                  label="Hire Date" 
                  value={format(new Date(hireDate), 'MMMM d, yyyy')} 
                />
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-base-200 pb-2">
                Employment Details
              </h3>
              <div className="space-y-3">
                <ProfileDetail 
                  icon={<FiBriefcase />} 
                  label="Position" 
                  value={position} 
                />
                <ProfileDetail 
                  icon={<FiDollarSign />} 
                  label="Salary" 
                  value={`$${salary.toLocaleString()}`} 
                />
                <ProfileDetail 
                  icon={<FiClock />} 
                  label="Status" 
                  value={`${employmentStatus} (${isActive ? 'Active' : 'Inactive'})`} 
                />
                <ProfileDetail 
                  icon={<FiUser />} 
                  label="Role" 
                  value={userID.role.charAt(0).toUpperCase() + userID.role.slice(1)} 
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white border-b border-base-200 pb-2 mb-4">
                Skills
              </h3>
              <SkillsList skills={skills} />
            </div>
          )}

          {/* Documents Section */}
          {documents && documents.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white border-b border-base-200 pb-2 mb-4">
                Documents
              </h3>
              <DocumentList documents={documents} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white">{value || 'Not specified'}</p>
      </div>
    </div>
  );
}