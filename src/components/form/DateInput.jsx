import { motion } from "framer-motion";

export default function DateInput({ icon, label, name, value, onChange, required = false }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type="date"
          value={value ? new Date(value).toISOString().split('T')[0] : ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="bg-base-100/50 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3 backdrop-blur-sm"
        />
      </div>
    </motion.div>
  );
}