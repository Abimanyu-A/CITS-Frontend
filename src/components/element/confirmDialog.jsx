import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-base-100 rounded-xl p-6 max-w-md w-full shadow-xl"
      >
        <div className="flex items-start">
          <FiAlertTriangle className="text-yellow-500 text-2xl mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-gray-300">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Confirm
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmDialog;