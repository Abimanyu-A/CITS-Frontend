import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

export default function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-base-300/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-base-200 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="text-primary text-4xl"
          >
            <FiLoader />
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {message}
        </h2>
        
        <p className="text-gray-400 mb-6">
          Please wait while we process your request
        </p>
        
        <div className="w-full bg-base-300 rounded-full h-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="h-2.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
}