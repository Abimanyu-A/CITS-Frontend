import { motion } from "framer-motion";

export default function SkillBadge({ skill }) {
    return (
      <motion.span 
        whileHover={{ scale: 1.05 }}
        className="badge badge-primary badge-lg py-3 px-4"
      >
        {skill}
      </motion.span>
    );
  }