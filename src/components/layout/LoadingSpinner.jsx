import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export default function LoadingSpinner({ size = 24, className = "" }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className={`text-primary ${className}`}
      style={{ width: size, height: size }}
    >
      <FiLoader size={size} />
    </motion.div>
  );
}