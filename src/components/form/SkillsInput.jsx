import { motion } from "framer-motion";
import { useState } from "react";

export default function SkillsInput({ skills, onChange }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <motion.div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          placeholder="Add a skill"
          className="bg-base-100/70 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary flex-1 p-3 backdrop-blur-sm"
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddSkill}
          className="bg-primary/80 hover:bg-primary text-white px-4 rounded-lg"
        >
          Add
        </motion.button>
      </div>
      
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-primary/20 text-primary rounded-full px-3 py-1 flex items-center gap-1"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-primary/70 hover:text-primary"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}