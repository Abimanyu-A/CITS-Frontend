import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  FiUser, FiPhone, FiHome, FiCalendar, 
  FiActivity, FiAward, FiFileText, 
  FiMail, FiBriefcase, FiDownload
} from "react-icons/fi";

const ProfilePage = () => {
  const { employee } = useSelector((state) => state.emp);

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row gap-8 items-center lg:items-start bg-base-100 rounded-box p-6 shadow-sm mb-8"
        >
          <div className="avatar">
            <div className="w-40 h-40 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img 
                src={employee.photo || '/default-avatar.png'} 
                alt={`${employee.firstName} ${employee.lastName}`}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <h1 className="text-3xl font-bold text-base-content">
              {employee.firstName} {employee.lastName}
            </h1>
            <div className="badge badge-primary badge-lg mt-2 gap-1">
              <FiBriefcase className="text-lg" />
              {employee.position}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-base-200 p-3 rounded-box">
                <FiMail className="text-xl text-primary" />
                <div>
                  <p className="text-sm text-base-content/70">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-base-200 p-3 rounded-box">
                <FiPhone className="text-xl text-primary" />
                <div>
                  <p className="text-sm text-base-content/70">Phone</p>
                  <p className="font-medium">
                    {employee.phone || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-base-200 p-3 rounded-box">
                <FiCalendar className="text-xl text-primary" />
                <div>
                  <p className="text-sm text-base-content/70">Date of Birth</p>
                  <p className="font-medium">
                    {employee.dob ? new Date(employee.dob).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {/* Address Section */}
          <SectionCard 
            icon={<FiHome />} 
            title="Address"
            visible={!!employee.address}
          >
            {employee.address && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Street" value={employee.address.street} />
                <InfoField label="City" value={employee.address.city} />
                <InfoField label="State" value={employee.address.state} />
                <InfoField label="Zip Code" value={employee.address.zipCode} />
                <InfoField label="Country" value={employee.address.country} />
              </div>
            )}
          </SectionCard>

          {/* Emergency Contact */}
          <SectionCard 
            icon={<FiActivity />} 
            title="Emergency Contact"
            visible={!!employee.emergencyContact}
          >
            {employee.emergencyContact && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoField label="Name" value={employee.emergencyContact.name} />
                <InfoField label="Relationship" value={employee.emergencyContact.relationship} />
                <InfoField label="Phone" value={employee.emergencyContact.phone} />
              </div>
            )}
          </SectionCard>

          {/* Skills Section */}
          <SectionCard 
            icon={<FiAward />} 
            title="Skills"
            visible={employee.skills?.length > 0}
          >
            <div className="flex flex-wrap gap-2">
              {employee.skills?.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="badge badge-primary gap-2">
                    {skill}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* Documents Section */}
          <SectionCard 
            icon={<FiFileText />} 
            title="Documents"
            visible={employee.documents?.length > 0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employee.documents?.map((doc, index) => (
                <DocumentCard key={index} document={doc} />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const SectionCard = ({ icon, title, children, visible = true }) => {
  if (!visible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-base-100 rounded-box p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-sm text-base-content/70">{label}</p>
    <p className="font-medium">
      {value || <span className="text-base-content/50">Not provided</span>}
    </p>
  </div>
);

const DocumentCard = ({ document }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="card bg-base-200 rounded-box overflow-hidden"
  >
    <div className="card-body p-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-box">
          <FiFileText className="text-primary text-xl" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-base-content">{document.name}</h3>
          <p className="text-sm text-base-content/70">{document.type}</p>
        </div>
        <button className="btn btn-ghost btn-sm">
          <FiDownload className="text-primary" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default ProfilePage;