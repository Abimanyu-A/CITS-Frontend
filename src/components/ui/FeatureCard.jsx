import { motion } from "framer-motion";

function FeatureCard({ title, description }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-base-200 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;