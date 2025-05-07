import { motion } from "framer-motion";
import { FiUsers, FiX } from "react-icons/fi";

const TeamDetails = ({ team, onClose }) => {
  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <FiUsers className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
        <h3 className="text-xl font-medium mb-2">Select a Team</h3>
        <p className="text-gray-400 max-w-md">
          Click on a team from the list to view its details and members.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="lg:col-span-2 bg-base-100 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6 border-b border-base-300">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{team.name}</h2>
            <p className="text-gray-300 mt-1">{team.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-base-300 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiUsers className="text-primary" /> Team Members
        </h3>

        {team.members && team.members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.members.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>
        ) : (
          <EmptyMembersState />
        )}
      </div>
    </motion.div>
  );
};

export default TeamDetails;