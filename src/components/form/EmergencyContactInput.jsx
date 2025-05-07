import { motion } from "framer-motion";
import { FiUser, FiHeart, FiPhone } from "react-icons/fi";
import TextInput from "./TextInput";

export default function EmergencyContactInput({ contact = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <motion.div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          label="Full Name"
          name="name"
          value={contact.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          icon={<FiUser className="text-gray-400" />}
        />
        <TextInput
          label="Relationship"
          name="relationship"
          value={contact.relationship || ''}
          onChange={(e) => handleChange('relationship', e.target.value)}
          icon={<FiHeart className="text-gray-400" />}
        />
      </div>
      <TextInput
        label="Phone Number"
        name="phone"
        value={contact.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        icon={<FiPhone className="text-gray-400" />}
      />
    </motion.div>
  );
}