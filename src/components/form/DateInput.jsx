import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import TextInput from "./TextInput";

export default function DateInput({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false 
}) {
  return (
    <TextInput
      label={label}
      name={name}
      type="date"
      value={value ? new Date(value).toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      icon={<FiCalendar className="text-gray-400" />}
    />
  );
}