import { motion } from "framer-motion";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";

export default function DocumentUpload({ documents, onChange }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadDate: new Date()
    }));
    onChange([...documents, ...newDocuments]);
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    onChange(updatedDocuments);
  };

  return (
    <motion.div className="space-y-4">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FiPaperclip className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm text-gray-300">Click to upload documents</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          multiple 
          onChange={handleFileChange}
        />
      </label>
      
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between bg-base-100/30 p-3 rounded-lg"
            >
              <div className="truncate flex-1">{doc.name}</div>
              <button
                type="button"
                onClick={() => handleRemoveDocument(index)}
                className="text-error hover:text-error/70 p-1"
              >
                <FiTrash2 />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}