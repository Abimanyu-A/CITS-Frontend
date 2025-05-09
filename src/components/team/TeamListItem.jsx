import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import TeamActions from "./TeamActions";

const TeamListItem = ({ team, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
      className={`p-4 cursor-pointer transition-colors ${isSelected ? 'bg-primary/10' : ''}`}
      onClick={() => onSelect(team)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{team.teamName}</h3>
          <p className="text-sm text-gray-400 truncate">{team.description}</p>
        </div>
        {isSelected ? (
          <FiChevronUp className="text-gray-400" />
        ) : (
          <FiChevronDown className="text-gray-400" />
        )}
      </div>
      
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 pt-3 border-t border-base-300"
          >
            <TeamActions team={team} onEdit={onEdit} onDelete={onDelete} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamListItem;