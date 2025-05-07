import { motion } from "framer-motion";
import FeatureCard from "../components/ui/FeatureCard";
import { FiArrowRight, FiShield, FiTrendingUp, FiZap, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 py-12 mt-16">
        <div className="max-w-7xl w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-6"
            >
              <div className="bg-primary/20 rounded-full p-3">
                <FiTrendingUp className="text-primary w-8 h-8" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Streamline Your <span className="text-primary">Company Data</span> Management
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Our intelligent tracking system helps you monitor, analyze, and optimize your business processes with beautiful simplicity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-3 rounded-full font-semibold"
                onClick={()=> navigate("/login")}
              >
                Get Started <FiArrowRight className="ml-2" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline px-8 py-3 rounded-full font-semibold"
              >
                Live Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <div className="bg-base-100/50 p-6 rounded-xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-gray-300">Uptime</div>
            </div>
            <div className="bg-base-100/50 p-6 rounded-xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-gray-300">Companies</div>
            </div>
            <div className="bg-base-100/50 p-6 rounded-xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-300">Support</div>
            </div>
            <div className="bg-base-100/50 p-6 rounded-xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-300">Secure</div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            id="features"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Everything you need to manage your company data effectively
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<FiZap className="w-6 h-6" />}
                title="Real-time Analytics"
                description="Get instant insights with our powerful dashboard and live data processing."
              />
              <FeatureCard 
                icon={<FiShield className="w-6 h-6" />}
                title="Enterprise Security"
                description="Military-grade encryption keeps your sensitive data protected at all times."
              />
              <FeatureCard 
                icon={<FiTrendingUp className="w-6 h-6" />}
                title="Performance Metrics"
                description="Track KPIs and business metrics with beautiful, customizable reports."
              />
            </div>
          </motion.div>

          {/* Testimonial Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-base-100/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-3xl">👔</span>
              </div>
              <div>
                <blockquote className="text-lg italic mb-4">
                  "This system transformed how we track our business data. Implementation was seamless and our team adopted it immediately."
                </blockquote>
                <div className="font-semibold">— Sarah Johnson, CEO</div>
                <div className="text-sm text-gray-300">TechSolutions Inc.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}