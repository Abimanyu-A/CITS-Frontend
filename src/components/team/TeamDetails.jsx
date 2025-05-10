import { motion } from "framer-motion";
import { FiUsers, FiX } from "react-icons/fi";
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from "react-redux";
import EmptyMembersState from "./EmptyMembersState";
import MemberCard from "./MemberCard";

const TeamDetails = ({ team, onClose }) => {
  const { data: allEmployees, loading, error } = useSelector((state) => state.emp.allEmployees);

  const members = useMemo(() => {
    return team ? allEmployees.filter(employee => employee.teamId?._id === team._id) : [];
  }, [allEmployees, team]);

  console.log(members)

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="animate-pulse">
          <FiUsers className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">Loading team data...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <FiUsers className="w-16 h-16 text-red-400 mb-4 opacity-50" />
        <h3 className="text-xl font-medium mb-2">Error loading team data</h3>
        <p className="text-gray-400 max-w-md">
          {error.message || 'Failed to load team information'}
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
      aria-labelledby="team-details-heading"
    >
      <div className="p-6 border-b border-base-300">
        <div className="flex justify-between items-start">
          <div>
            <h2 id="team-details-heading" className="text-2xl font-bold">{team.teamName}</h2>
            <p className="text-gray-300 mt-1">{team.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-base-300 transition-colors"
            aria-label="Close team details"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiUsers className="text-primary" /> Team Members
        </h3>

        {members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((member) => (
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

TeamDetails.propTypes = {
  team: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default TeamDetails;