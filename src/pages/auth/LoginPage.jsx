import { motion } from "framer-motion";
import { FiLock, FiUser, FiLogIn } from "react-icons/fi"; 
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunk";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../../features/emp/empThunk";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
      console.log(user);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(credentials));
      dispatch(getAllEmployees());
    
  };

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-6">
            <div className="bg-primary/20 rounded-full p-4">
              <FiLock className="text-primary w-8 h-8" />
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Welcome <span className="text-primary">Back</span>
          </h1>

          <p className="text-gray-300">Sign in to your company dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-error/20 text-error px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="bg-base-100/50 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3 backdrop-blur-sm"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="bg-base-100/50 border border-base-100 text-white placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3 backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold bg-gray-200 hover:bg-gray-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign In <FiLogIn className="w-4 h-4" />
            </motion.button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-base-200 text-gray-400">New to our platform?</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
