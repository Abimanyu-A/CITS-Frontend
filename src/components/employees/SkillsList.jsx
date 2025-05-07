import { motion } from "framer-motion";

export default function SkillsList({ skills }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}