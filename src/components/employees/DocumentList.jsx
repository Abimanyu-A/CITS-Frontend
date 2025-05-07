import { FiFile, FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DocumentList({ documents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {documents.map((doc, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <FiFile className="text-gray-400" />
            <div>
              <p className="text-white">{doc.name}</p>
              <p className="text-xs text-gray-400">{doc.type}</p>
            </div>
          </div>
          <a 
            href={`/uploads/documents/${doc.file}`} 
            download
            className="text-primary hover:text-primary/80"
          >
            <FiDownload />
          </a>
        </motion.div>
      ))}
    </div>
  );
}