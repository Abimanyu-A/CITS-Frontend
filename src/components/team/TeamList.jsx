// components/team/TeamList.jsx
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiChevronDown, FiChevronUp } from "react-icons/fi";
import TeamListItem from "./TeamListItem";

const TeamList = ({ teams, selectedTeam, onSelectTeam, onDelete, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1 bg-base-100 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-base-300">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FiUsers className="text-primary" /> Teams ({teams.length})
        </h2>
      </div>
      
      <div className="divide-y divide-base-300 max-h-[600px] overflow-y-auto">
        {teams.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No teams found. Create your first team!
          </div>
        ) : (
          teams.map((team) => (
            <TeamListItem
              key={team._id}
              team={team}
              isSelected={selectedTeam?._id === team._id}
              onSelect={onSelectTeam}
              onEdit = {onEdit}
              onDelete = {onDelete}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default TeamList;