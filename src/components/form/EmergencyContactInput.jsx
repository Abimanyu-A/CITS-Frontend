import { motion } from "framer-motion";
import { FiUser, FiHeart, FiPhone } from "react-icons/fi";

export default function EmergencyContactInput({ contact, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <motion.div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <FiUser className="text-gray-400" />
          </div>
          <input
            value={contact.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Full Name"
            className="bg-base-100/70 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3 backdrop-blur-sm"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <FiHeart className="text-gray-400" />
          </div>
          <input
            value={contact.relationship || ''}
            onChange={(e) => handleChange('relationship', e.target.value)}
            placeholder="Relationship"
            className="bg-base-100/70 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3 backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <FiPhone className="text-gray-400" />
        </div>
        <input
          value={contact.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Phone Number"
          className="bg-base-100/70 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3 backdrop-blur-sm"
        />
      </div>
    </motion.div>
  );
}