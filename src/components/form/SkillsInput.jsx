import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import Button from "../element/Button";

export default function SkillsInput({ 
  skills = [], 
  onChange, 
  maxSkills = 10,
  placeholder = "Add a skill",
  label = ""
}) {
  const [newSkill, setNewSkill] = useState('');
  const inputRef = useRef(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    
    if (!trimmedSkill) return;
    
    if (skills.length >= maxSkills) {
      setIsLimitReached(true);
      setTimeout(() => setIsLimitReached(false), 3000);
      return;
    }

    if (!skills.includes(trimmedSkill)) {
      onChange([...skills, trimmedSkill]);
      setNewSkill('');
      inputRef.current?.focus();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
    if (isLimitReached && skills.length - 1 < maxSkills) {
      setIsLimitReached(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <motion.div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-base-200 border border-base-300 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary flex-1 p-3"
          aria-label={placeholder}
          disabled={skills.length >= maxSkills}
        />
        <Button
          type="button"
          onClick={handleAddSkill}
          icon={<FiPlus className="w-4 h-4" />}
          size="sm"
          variant="primary"
          disabled={!newSkill.trim() || skills.length >= maxSkills}
          aria-label="Add skill"
        >
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {isLimitReached && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-error"
            >
              Maximum {maxSkills} skills allowed
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div 
          layout
          className="flex flex-wrap gap-2 min-h-8"
        >
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-primary/20 text-primary rounded-full px-3 py-1.5 flex items-center gap-1 text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-primary/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
                  aria-label={`Remove ${skill}`}
                >
                  <FiX className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="text-xs text-gray-400">
        {skills.length} of {maxSkills} skills added
      </div>
    </motion.div>
  );
}