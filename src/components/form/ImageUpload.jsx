import { motion } from "framer-motion";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export default function ImageUpload({ currentImage, onChange }) {
  const [preview, setPreview] = useState(
    typeof currentImage === "string" ? currentImage : ''
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file); 
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    onChange(null);
  };

  return (
    <motion.div className="flex flex-col items-center space-y-4">
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-2 border-primary/30"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-error text-white p-1 rounded-full"
          >
            <FiTrash2 className="w-4 h-4" />
          </motion.button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-primary/30 cursor-pointer hover:border-primary/50">
          <FiCamera className="w-8 h-8 text-primary mb-2" />
          <span className="text-xs text-gray-300">Upload Photo</span>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      )}
    </motion.div>
  );
}
