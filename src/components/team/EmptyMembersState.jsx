import { FiUsers } from "react-icons/fi";

const EmptyMembersState = () => {
  return (
    <div className="text-center py-8 text-gray-400">
      <FiUsers className="mx-auto w-12 h-12 mb-2 opacity-50" />
      <p>No members in this team yet</p>
    </div>
  );
};

export default EmptyMembersState;