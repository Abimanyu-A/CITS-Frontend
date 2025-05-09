import { FiFile, FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DocumentCard({ document }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-base-100 rounded-box p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-3 rounded-box">
          <FiFile className="text-primary text-xl" />
        </div>
        <div className="flex-grow">
          <h4 className="font-medium text-white">{document.name}</h4>
          <p className="text-sm text-white/70">{document.type}</p>
        </div>
        <button className="btn btn-ghost btn-sm">
          <FiDownload className="text-primary" />
        </button>
      </div>
    </motion.div>
  );
}