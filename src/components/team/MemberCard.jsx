import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";

const MemberCard = ({ member }) => {
  console.log(member)
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-base-200 p-4 rounded-lg flex items-center gap-4"
    >
      <div className="avatar placeholder">
        <div className="bg-primary/20 text-primary rounded-full w-12 h-12 flex items-center justify-center">
          <img src={member.photo} alt="" />
        </div>
      </div>
      <div>
        <h4 className="font-medium">{member.firstName} {member.lastName}</h4>
        <p className="text-sm text-gray-400">{member.position}</p>
      </div>
    </motion.div>
  );
};

export default MemberCard;